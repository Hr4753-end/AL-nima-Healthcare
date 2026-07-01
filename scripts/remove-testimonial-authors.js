const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'about.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Removing author info from testimonials...\n');

// Remove the entire author-area div including image, name, and stars
// Pattern matches: <div class="author-area">...</div>
const authorAreaPattern = /<div class="author-area">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;

// Count how many we're removing
const matches = content.match(authorAreaPattern);
const count = matches ? matches.length : 0;

// Remove all author areas
content = content.replace(authorAreaPattern, '</div>');

console.log(`✅ Removed ${count} author sections (images, names, and star ratings)`);

// Write the updated content
fs.writeFileSync(filePath, content, 'utf8');

console.log('\n✨ Testimonials updated - now showing only the review text!');
