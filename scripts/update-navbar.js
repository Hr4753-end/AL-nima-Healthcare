const fs = require('fs');
const path = require('path');

// Proper navbar HTML structure
const properNavbar = `    <header class="header-one header--sticky">
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
                                        <a href="doctors-two.html">Our Doctors</a>
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
            content = content.replace(headerRegex, properNavbar);
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
const htmlFiles = [
    'hospitals.html',
    'hospital-details.html',
    'services.html',
    'about.html',
    'appoinment.html',
    'appointment-form.html',
    'contactus.html'
];

// Get all service pages
const serviceFiles = fs.readdirSync(path.join(__dirname, '..'))
    .filter(file => file.startsWith('service-') && file.endsWith('.html'));

// Combine all files to update
const allFiles = [...htmlFiles, ...serviceFiles];

console.log(`Updating navbar in ${allFiles.length} files...\n`);

let successCount = 0;
let failCount = 0;

allFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
        if (updateNavbarInFile(filePath)) {
            console.log(`✓ Updated: ${file}`);
            successCount++;
        } else {
            console.log(`✗ No header found: ${file}`);
            failCount++;
        }
    } else {
        console.log(`✗ File not found: ${file}`);
        failCount++;
    }
});

console.log(`\n✓ Successfully updated ${successCount} files`);
if (failCount > 0) {
    console.log(`✗ Failed to update ${failCount} files`);
}
