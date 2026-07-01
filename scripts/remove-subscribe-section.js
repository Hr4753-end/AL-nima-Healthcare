const fs = require('fs');
const path = require('path');

// Get all HTML files in root directory
const rootDir = path.join(__dirname, '..');
const allFiles = fs.readdirSync(rootDir);
const htmlFiles = allFiles.filter(file => file.endsWith('.html'));

let updatedCount = 0;

console.log(`Removing subscribe section from ${htmlFiles.length} HTML files...\n`);

htmlFiles.forEach(filename => {
    const filePath = path.join(rootDir, filename);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if file has the subscribe section
        if (content.includes('subscribe-area-start')) {
            // Remove the entire subscribe area section
            const subscribePattern = /<!-- subscribe area start -->[\s\S]*?<!-- subscribe area end -->/;
            
            if (subscribePattern.test(content)) {
                content = content.replace(subscribePattern, '');
                
                // Also remove the wrapping col-lg-12 div if it's now empty
                content = content.replace(
                    /<div class="col-lg-12">\s*<\/div>/g,
                    ''
                );
                
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ Updated: ${filename}`);
                updatedCount++;
            }
        }
        
    } catch (error) {
        console.log(`❌ Error: ${filename} - ${error.message}`);
    }
});

console.log(`\n📊 Summary:`);
console.log(`   ✅ Updated: ${updatedCount} files`);
console.log(`\n✨ Subscribe section removed from all footers!`);
