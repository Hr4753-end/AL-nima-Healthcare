const fs = require('fs');
const path = require('path');

// New contact information
const contactInfo = {
    email: 'alnimaglobalhealthservices@gmail.com',
    phoneChad1: '+235 6850 0001',
    phoneChad2: '+235 6752 5245',
    phoneIndia: '+91 92171 50972',
    whatsappChad1: '+235 6850 0001',
    whatsappChad2: '+235 6752 5245',
    whatsappIndia: '+91 92171 50972',
    locationChad: 'N\'Djamena – Chad',
    locationIndia: 'Shaheen Bagh, New Delhi – India',
    locations: 'N\'Djamena – Chad, Shaheen Bagh, New Delhi – India'
};

// Function to update contact info in a file
function updateContactInfoInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        let updated = false;

        // Update email addresses
        const oldEmails = [
            'info@apollohospitals.com',
            'info@fortishealthcare.com',
            'info@carehospitals.com',
            'info@hospital.com',
            'contact@hospital.com'
        ];
        
        oldEmails.forEach(oldEmail => {
            if (content.includes(oldEmail)) {
                content = content.replace(new RegExp(oldEmail, 'g'), contactInfo.email);
                updated = true;
            }
        });

        // Update phone numbers in emergency line
        const emergencyLinePatterns = [
            /Emergency Line:\s*\+91\s*92171\s*50972/g,
            /Emergency:\s*\+91\s*92171\s*50972/g,
            /\+91-11-26825000/g,
            /\+91-120-6644444/g,
            /\+91-40-61656565/g
        ];

        emergencyLinePatterns.forEach(pattern => {
            if (pattern.test(content)) {
                content = content.replace(pattern, `Emergency Line: ${contactInfo.phoneIndia}`);
                updated = true;
            }
        });

        // Update location in header top area
        const oldLocations = [
            'Delhi, Gurugram, Noida – India',
            'N\'Djamena – Chad,<br> Shaheen Bagh, New Delhi – India',
            'Sarita Vihar, New Delhi',
            'Sector 62, Noida'
        ];

        oldLocations.forEach(oldLoc => {
            if (content.includes(oldLoc)) {
                content = content.replace(new RegExp(oldLoc, 'g'), contactInfo.locations);
                updated = true;
            }
        });

        // Update 24/7 text variations
        const timePatterns = [
            'Monday - Friday 08:00 - 20:00',
            'Mon - Fri: 9:00 AM - 6:00 PM'
        ];

        timePatterns.forEach(pattern => {
            if (content.includes(pattern)) {
                content = content.replace(new RegExp(pattern, 'g'), '24/7 Emergency Services Available');
                updated = true;
            }
        });

        if (updated) {
            fs.writeFileSync(filePath, content);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Get all HTML files in root directory
function getAllHtmlFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isFile() && item.endsWith('.html')) {
            files.push(item);
        }
    });
    
    return files;
}

const rootDir = path.join(__dirname, '..');
const allHtmlFiles = getAllHtmlFiles(rootDir);

console.log(`Updating contact information in ${allHtmlFiles.length} HTML files...\n`);

let successCount = 0;
let skippedCount = 0;

allHtmlFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    
    if (updateContactInfoInFile(filePath)) {
        console.log(`✓ Updated: ${file}`);
        successCount++;
    } else {
        skippedCount++;
    }
});

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✓ Successfully updated: ${successCount} files`);
console.log(`⊘ No changes needed: ${skippedCount} files`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`\nContact Information Updated:`);
console.log(`📧 Email: ${contactInfo.email}`);
console.log(`📱 WhatsApp Chad: ${contactInfo.whatsappChad1} | ${contactInfo.whatsappChad2}`);
console.log(`📱 WhatsApp India: ${contactInfo.whatsappIndia}`);
console.log(`📍 Offices: ${contactInfo.locations}`);
