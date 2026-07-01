const fs = require('fs');
const path = require('path');

// Consistent footer HTML with real services
const footerHTML = `    <!-- rts footer area start -->
    <div class="rts-footer-area footer-bg pt--105 pt_sm--50">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <!-- subscribe area start -->
                    <div class="subscribe-area-start pb--30">
                        <a href="index.html" class="logo">
                            <img src="assets/images/logo/logo-2.png" alt="logo">
                        </a>
                        <!-- subscribe area start -->
                        <div class="subscribe-area">
                            <input type="text" placeholder="Enter your mail">
                            <button class="rts-btn btn-primary">Subscribe</button>
                        </div>
                        <!-- subscribe area end -->
                    </div>
                    <!-- subscribe area end -->
                </div>
                <div class="col-lg-12">
                    <div class="footer-wrapper-style-between">
                        <div class="single-wized">
                            <h6 class="title">Contact</h6>
                            <div class="body">
                                <p class="location">
                                    N'Djamena – Chad<br>
                                    Shaheen Bagh, New Delhi – India
                                </p>
                                <a href="mailto:alnimaglobalhealthservices@gmail.com">alnimaglobalhealthservices@gmail.com</a>
                                <a href="tel:+919217150972">+91 92171 50972</a>
                                <a href="https://wa.me/23568500001">+235 6850 0001</a>
                                <a href="https://wa.me/23567525245">+235 6752 5245</a>
                            </div>
                        </div>
                        <div class="single-wized">
                            <h6 class="title">Quick Links</h6>
                            <div class="body">
                                <ul class="nav-bottom">
                                    <li><a href="index.html">Home</a></li>
                                    <li><a href="hospitals.html">Hospitals</a></li>
                                    <li><a href="services.html">Services</a></li>
                                    <li><a href="about.html">About Us</a></li>
                                    <li><a href="contactus.html">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="single-wized">
                            <h6 class="title">Our Services</h6>
                            <div class="body">
                                <ul class="nav-bottom">
                                    <li><a href="service-cardiology.html">Cardiology</a></li>
                                    <li><a href="service-neurology.html">Neurology</a></li>
                                    <li><a href="service-orthopedics.html">Orthopedics</a></li>
                                    <li><a href="service-oncology.html">Oncology</a></li>
                                    <li><a href="service-urology-kidney-transplant.html">Urology</a></li>
                                    <li><a href="services.html">View All Services</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="single-wized">
                            <h6 class="title">Working Hours</h6>
                            <div class="body">
                                <p class="location">
                                    24/7 Emergency Services
                                </p>
                                <p class="location">
                                    Mon - Fri: 9:00 AM - 5:00 PM
                                </p>
                                <p class="location">
                                    Saturday: 10:00 AM - 6:00 PM
                                </p>
                                <p class="location">
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="copyright-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="copyright-area-inner">
                        <p>© 2025 Al-Nima Global Health Services. All Rights Reserved by <a target="_blank" href="https://al-nima.com">Al-Nima</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- rts footer area end -->`;

// Get all HTML files in root directory
const rootDir = path.join(__dirname, '..');
const allFiles = fs.readdirSync(rootDir);
const htmlFiles = allFiles.filter(file => file.endsWith('.html'));

let updatedCount = 0;
let skippedCount = 0;
let errorCount = 0;

console.log(`Found ${htmlFiles.length} HTML files to process...\n`);

htmlFiles.forEach(filename => {
    const filePath = path.join(rootDir, filename);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if file has a footer
        if (!content.includes('rts-footer-area') && !content.includes('footer-area')) {
            console.log(`⚠️  Skipped: ${filename} (no footer found)`);
            skippedCount++;
            return;
        }

        // Find and replace footer section
        const footerStart = content.indexOf('<!-- rts footer area start -->');
        const footerEnd = content.indexOf('<!-- rts footer area end -->');
        
        if (footerStart !== -1 && footerEnd !== -1) {
            const before = content.substring(0, footerStart);
            const after = content.substring(footerEnd + '<!-- rts footer area end -->'.length);
            content = before + footerHTML + after;
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated: ${filename}`);
            updatedCount++;
        } else {
            console.log(`⚠️  Skipped: ${filename} (footer markers not found)`);
            skippedCount++;
        }
        
    } catch (error) {
        console.log(`❌ Error: ${filename} - ${error.message}`);
        errorCount++;
    }
});

console.log(`\n📊 Summary:`);
console.log(`   ✅ Updated: ${updatedCount} files`);
console.log(`   ⚠️  Skipped: ${skippedCount} files`);
console.log(`   ❌ Errors: ${errorCount} files`);
console.log(`\n✨ Footer update complete!`);
console.log(`\nFooter now includes:`);
console.log(`   - Updated contact information`);
console.log(`   - Quick Links section`);
console.log(`   - Real service pages (Cardiology, Neurology, Orthopedics, Oncology, Urology)`);
console.log(`   - Link to view all services`);
console.log(`   - Updated working hours with 24/7 emergency services`);
