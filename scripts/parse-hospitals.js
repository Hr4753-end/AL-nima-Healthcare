const fs = require('fs');
const path = require('path');

// Parse hospital text file
function parseHospitalFile(filePath, city) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').map(line => line.trim()).filter(line => line);
    
    const hospital = {
        id: '',
        name: '',
        city: city,
        beds: '',
        established: '',
        type: '',
        description: '',
        about: '',
        departments: [],
        address: '',
        teamInfo: '',
        infrastructure: '',
        facilities: {
            comfort: [],
            money: [],
            food: [],
            treatment: []
        }
    };
    
    // Extract name (first line)
    hospital.name = lines[0].replace(/^[●​\t\s]+/, '');
    hospital.id = hospital.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    let currentSection = '';
    let currentFacilityType = '';
    let aboutText = [];
    let teamText = [];
    let infraText = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const cleanLine = line.replace(/^[●​\t\s]+/, '');
        
        // Skip empty or very short lines
        if (cleanLine.length < 2) continue;
        
        // Extract basic info from first few lines
        if (i < 5) {
            if (cleanLine.match(/^\d+\s*Beds/)) {
                hospital.beds = cleanLine.match(/^(\d+)\s*Beds/)?.[1] || '';
                continue;
            } else if (cleanLine.includes('Establish in:')) {
                hospital.established = cleanLine.match(/Establish in:\s*(\d+)/)?.[1] || '';
                continue;
            } else if (cleanLine.match(/(Multispeciality|Super Speciality|Speciality)\s*Hospital/i)) {
                hospital.type = cleanLine;
                continue;
            }
        }
        
        // Check for section headers
        if (cleanLine === 'About the Hospital') {
            currentSection = 'about';
            continue;
        } else if (cleanLine === 'Select Department of Interest') {
            currentSection = 'departments';
            continue;
        } else if (cleanLine === 'Hospital Address') {
            currentSection = 'address';
            continue;
        } else if (cleanLine === 'Team & Specialities') {
            currentSection = 'team';
            continue;
        } else if (cleanLine === 'Infrastructure') {
            currentSection = 'infrastructure';
            continue;
        } else if (cleanLine === 'Facilities') {
            currentSection = 'facilities';
            continue;
        } else if (cleanLine === 'Comfort During Stay') {
            currentFacilityType = 'comfort';
            continue;
        } else if (cleanLine === 'Money Matters') {
            currentFacilityType = 'money';
            continue;
        } else if (cleanLine === 'Food') {
            currentFacilityType = 'food';
            continue;
        } else if (cleanLine === 'Treatment Related') {
            currentFacilityType = 'treatment';
            continue;
        } else if (cleanLine === 'Tab 1') {
            continue;
        }
        
        // Process content based on current section
        if (currentSection === 'about' && cleanLine.length > 30) {
            aboutText.push(cleanLine);
        } else if (currentSection === 'departments' && cleanLine.length > 2 && cleanLine.length < 100) {
            hospital.departments.push(cleanLine);
        } else if (currentSection === 'address' && cleanLine.length > 10) {
            hospital.address = cleanLine;
            currentSection = '';
        } else if (currentSection === 'team' && cleanLine.length > 30) {
            teamText.push(cleanLine);
        } else if (currentSection === 'infrastructure' && cleanLine.length > 30) {
            infraText.push(cleanLine);
        } else if (currentSection === 'facilities' && currentFacilityType && cleanLine.length > 2) {
            hospital.facilities[currentFacilityType].push(cleanLine);
        }
    }
    
    // Set description from first paragraph
    if (aboutText.length > 0) {
        hospital.description = aboutText[0];
        hospital.about = aboutText.join(' ');
    }
    
    hospital.teamInfo = teamText.join(' ');
    hospital.infrastructure = infraText.join(' ');
    
    return hospital;
}

// Parse all hospitals
function parseAllHospitals() {
    const hospitals = [];
    const cities = ['Delhi', 'Gurugram', 'Noida'];
    
    cities.forEach(city => {
        const cityPath = path.join(__dirname, '..', 'data', 'hospitals', city);
        const files = fs.readdirSync(cityPath).filter(f => f.endsWith('.txt'));
        
        files.forEach(file => {
            const filePath = path.join(cityPath, file);
            const hospital = parseHospitalFile(filePath, city);
            hospitals.push(hospital);
        });
    });
    
    return hospitals;
}

// Main execution
const hospitals = parseAllHospitals();

// Save to JSON
const outputPath = path.join(__dirname, '..', 'data', 'hospitals-data.json');
fs.writeFileSync(outputPath, JSON.stringify(hospitals, null, 2));

console.log(`✓ Parsed ${hospitals.length} hospitals`);
console.log(`✓ Saved to ${outputPath}`);

// Generate summary
const summary = {
    totalHospitals: hospitals.length,
    byCity: {
        Delhi: hospitals.filter(h => h.city === 'Delhi').length,
        Gurugram: hospitals.filter(h => h.city === 'Gurugram').length,
        Noida: hospitals.filter(h => h.city === 'Noida').length
    },
    allDepartments: [...new Set(hospitals.flatMap(h => h.departments))].sort()
};

console.log('\nSummary:');
console.log(`- Total: ${summary.totalHospitals} hospitals`);
console.log(`- Delhi: ${summary.byCity.Delhi} hospitals`);
console.log(`- Gurugram: ${summary.byCity.Gurugram} hospitals`);
console.log(`- Noida: ${summary.byCity.Noida} hospitals`);
console.log(`- Unique Departments: ${summary.allDepartments.length}`);
