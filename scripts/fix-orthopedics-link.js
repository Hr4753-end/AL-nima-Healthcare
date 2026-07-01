const fs = require('fs');
const path = require('path');

// Get all HTML files in root directory
const rootDir = path.join(__dirname, '..');
const allFiles = fs.readdirSync(rootDir);
const htmlFiles = allFiles.filter(file => file.endsWith('.html'));

let updatedCount = 0;

console.log(`Fixing orthopedics link in ${htmlFiles.length} HTML files...\n`);

htmlFiles.forEach(filename => {
    const filePath = path.join(rootDir, filename);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if file has the incorrect link
        if (content.includes('service-orthopedics.html')) {
            // Replace the incorrect link with the correct one
            content = content.replace(/service-orthopedics\.html/g, 'service-orthopedic-and-joint-replacement.html');
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Fixed: ${filename}`);
            updatedCount++;
        }
        
    } catch (error) {
        console.log(`❌ Error: ${filename} - ${error.message}`);
    }
});

console.log(`\n📊 Summary:`);
console.log(`   ✅ Fixed: ${updatedCount} files`);
console.log(`\n✨ Orthopedics link fixed!`);
console.log(`   Old: service-orthopedics.html`);
console.log(`   New: service-orthopedic-and-joint-replacement.html`);
