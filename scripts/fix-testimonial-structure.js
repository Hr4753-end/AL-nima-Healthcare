const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'about.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Fixing testimonial card structure...\n');

// Fix the broken structure - remove the extra closing div that's breaking the layout
// The pattern is: </p> followed by </div> (extra) followed by <div class="shape">
const brokenPattern = /<\/p>\s*<\/div>\s*<div class="shape">/g;
const fixedPattern = '</p>\n                                    <div class="shape">';

const matches = content.match(brokenPattern);
const count = matches ? matches.length : 0;

content = content.replace(brokenPattern, fixedPattern);

console.log(`✅ Fixed ${count} testimonial card structures`);

// Write the updated content
fs.writeFileSync(filePath, content, 'utf8');

console.log('\n✨ Testimonial cards should now display horizontally in the slider!');
