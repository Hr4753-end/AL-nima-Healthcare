const fs = require('fs');
const path = require('path');

// Consistent navbar HTML structure (without "Our Doctors")
const consistentNavbar = `    <header class="header-one header--sticky">
        <div class="header-top-area">
            <div class="container-full-header">
                <div class="col-lg-12">
                    <div class="header-top">
                        <div class="left">
                            <div class="map-area">
                                <i class="fa-sharp fa-regular fa-location-dot"></i>
                                <a href="#">Delhi, Gurugram, Noida – India</a>
                            </div>
                            <div class="map-area">
                                <i class="fa-light fa-clock"></i>
                                <a href="#">24/7 Emergency Services Available</a>
                            </div>
                        </div>
                        <div class="right">
                            <div class="map-area">
                                <i class="fa-regular fa-phone"></i>
                                <a href="#">Emergency Line: +91 92171 50972</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-full-header">
            <div class="row">
                <div class="col-lg-12">
                    <div class="header-wrapper-1">
                        <div class="logo-area-start">
                            <a href="index.html" class="logo">
                                <img src="assets/images/logo/logo.png" alt="logo_area">
                            </a>
                            <div class="nav-area">
                                <ul class="">
                                    <li class="main-nav">
                                        <a href="index.html">Home</a>
                                    </li>
                                    <li class="main-nav">
                                        <a href="hospitals.html">Hospitals</a>
                                    </li>
                                    <li class="main-nav">
                                        <a href="services.html">Services</a>
                                    </li>
                                    <li class="main-nav">
                                        <a href="about.html">About</a>
                                    </li>
                                    <li class="main-nav">
                                        <a href="contactus.html">Contact</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="header-right">
                            <a href="appoinment.html" class="rts-btn btn-primary">Book Appointment</a>
                            <div class="menu-btn" id="menu-btn">
                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="14" width="20" height="2" fill="#1F1F25"></rect>
                                    <rect y="7" width="20" height="2" fill="#1F1F25"></rect>
                                    <rect width="20" height="2" fill="#1F1F25"></rect>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>`;

// Function to replace navbar in a file
function updateNavbarInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Find the header section and replace it
        const headerRegex = /<header class="header-one[^>]*>[\s\S]*?<\/header>/;
        
        if (headerRegex.test(content)) {
            content = content.replace(headerRegex, consistentNavbar);
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
        
        // Only process files in root directory (not subdirectories)
        if (stat.isFile() && item.endsWith('.html')) {
            files.push(item);
        }
    });
    
    return files;
}

const rootDir = path.join(__dirname, '..');
const allHtmlFiles = getAllHtmlFiles(rootDir);

// Exclude certain files that might not need navbar
const excludeFiles = [
    '404.html',
    'error.html'
];

const filesToUpdate = allHtmlFiles.filter(file => !excludeFiles.includes(file));

console.log(`Found ${filesToUpdate.length} HTML files to update...\n`);

let successCount = 0;
let failCount = 0;
let skippedCount = 0;

filesToUpdate.forEach(file => {
    const filePath = path.join(rootDir, file);
    
    if (updateNavbarInFile(filePath)) {
        console.log(`✓ Updated: ${file}`);
        successCount++;
    } else {
        console.log(`⊘ No header found: ${file}`);
        skippedCount++;
    }
});

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✓ Successfully updated: ${successCount} files`);
console.log(`⊘ Skipped (no header): ${skippedCount} files`);
console.log(`✗ Failed: ${failCount} files`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`\nNavbar now consistent across all pages!`);
console.log(`Navigation items: Home | Hospitals | Services | About | Contact`);
