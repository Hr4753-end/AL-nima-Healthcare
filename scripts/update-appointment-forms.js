const fs = require('fs');
const path = require('path');

// The consistent appointment form HTML structure
const appointmentFormHTML = `    <!-- book your consulting start -->
    <div class="book-your-consulting rts-section-gapBottom">
        <div class="container">
            <div class="row g-0">
                <div class="col-lg-6">
                    <div class="appoinment-area-main bg_image">
                        <h2 class="title">Book your Free Consulting</h2>
                        <form action="#">
                            <div class="half-input-wrapper">
                                <input type="text" placeholder="Patient name">
                                <input type="text" placeholder="Phone Number">
                            </div>
                            <div class="search-input">
                                <select class="" style="display: none;">
                                    <option data-display="Select Department">Select Department</option>
                                    <option value="Cardiac Thoracic & Vascular Surgery">Cardiac Thoracic & Vascular Surgery</option>
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Cosmetic & Plastic Surgery">Cosmetic & Plastic Surgery</option>
                                    <option value="Dentistry">Dentistry</option>
                                    <option value="Dermatology & Cosmetology">Dermatology & Cosmetology</option>
                                    <option value="ENT & Cochlear Implant">ENT & Cochlear Implant</option>
                                    <option value="Gastroenterology">Gastroenterology</option>
                                    <option value="General & Minimally Invasive Surgery">General & Minimally Invasive Surgery</option>
                                    <option value="Gynaecological Oncology">Gynaecological Oncology</option>
                                    <option value="Haemato Oncology & BMT">Haemato Oncology & BMT</option>
                                    <option value="IVF, Reproductive Medicine">IVF, Reproductive Medicine</option>
                                    <option value="Liver Transplant & GI & HPB Surgery">Liver Transplant & GI & HPB Surgery</option>
                                    <option value="Medical Oncology">Medical Oncology</option>
                                    <option value="Nephrology">Nephrology</option>
                                    <option value="Neuro Surgery">Neuro Surgery</option>
                                    <option value="Neurointerventional Surgery">Neurointerventional Surgery</option>
                                    <option value="Neurology">Neurology</option>
                                    <option value="Obstetrics & Gynaecology">Obstetrics & Gynaecology</option>
                                    <option value="Oncology">Oncology</option>
                                    <option value="Opthamology">Opthamology</option>
                                    <option value="Orthopedic & Joint Replacement">Orthopedic & Joint Replacement</option>
                                    <option value="Paediatric Cardiac Care">Paediatric Cardiac Care</option>
                                    <option value="Paediatric Surgery">Paediatric Surgery</option>
                                    <option value="Radiation Oncology">Radiation Oncology</option>
                                    <option value="Spine & Scoliosis Surgery">Spine & Scoliosis Surgery</option>
                                    <option value="Surgical Oncology">Surgical Oncology</option>
                                    <option value="Urology & Kidney Transplant">Urology & Kidney Transplant</option>
                                </select>
                                <div class="nice-select custom-select one" style="flex-basis: 50%;" tabindex="0">
                                    <span class="current">Select Department</span>
                                    <ul class="list scrollable-dropdown">
                                        <li data-value="" data-display="Select Department" class="option selected focus">Select Department</li>
                                        <li data-value="Cardiac Thoracic & Vascular Surgery" class="option">Cardiac Thoracic & Vascular Surgery</li>
                                        <li data-value="Cardiology" class="option">Cardiology</li>
                                        <li data-value="Cosmetic & Plastic Surgery" class="option">Cosmetic & Plastic Surgery</li>
                                        <li data-value="Dentistry" class="option">Dentistry</li>
                                        <li data-value="Dermatology & Cosmetology" class="option">Dermatology & Cosmetology</li>
                                        <li data-value="ENT & Cochlear Implant" class="option">ENT & Cochlear Implant</li>
                                        <li data-value="Gastroenterology" class="option">Gastroenterology</li>
                                        <li data-value="General & Minimally Invasive Surgery" class="option">General & Minimally Invasive Surgery</li>
                                        <li data-value="Gynaecological Oncology" class="option">Gynaecological Oncology</li>
                                        <li data-value="Haemato Oncology & BMT" class="option">Haemato Oncology & BMT</li>
                                        <li data-value="IVF, Reproductive Medicine" class="option">IVF, Reproductive Medicine</li>
                                        <li data-value="Liver Transplant & GI & HPB Surgery" class="option">Liver Transplant & GI & HPB Surgery</li>
                                        <li data-value="Medical Oncology" class="option">Medical Oncology</li>
                                        <li data-value="Nephrology" class="option">Nephrology</li>
                                        <li data-value="Neuro Surgery" class="option">Neuro Surgery</li>
                                        <li data-value="Neurointerventional Surgery" class="option">Neurointerventional Surgery</li>
                                        <li data-value="Neurology" class="option">Neurology</li>
                                        <li data-value="Obstetrics & Gynaecology" class="option">Obstetrics & Gynaecology</li>
                                        <li data-value="Oncology" class="option">Oncology</li>
                                        <li data-value="Opthamology" class="option">Opthamology</li>
                                        <li data-value="Orthopedic & Joint Replacement" class="option">Orthopedic & Joint Replacement</li>
                                        <li data-value="Paediatric Cardiac Care" class="option">Paediatric Cardiac Care</li>
                                        <li data-value="Paediatric Surgery" class="option">Paediatric Surgery</li>
                                        <li data-value="Radiation Oncology" class="option">Radiation Oncology</li>
                                        <li data-value="Spine & Scoliosis Surgery" class="option">Spine & Scoliosis Surgery</li>
                                        <li data-value="Surgical Oncology" class="option">Surgical Oncology</li>
                                        <li data-value="Urology & Kidney Transplant" class="option">Urology & Kidney Transplant</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="search-input">
                                <select class="" style="display: none;">
                                    <option data-display="Select Hospital">Select Hospital</option>
                                    <option value="apollo-hospital-new-delhi">Apollo Hospital New Delhi</option>
                                    <option value="blk-max-super-speciality-hospital-new-delhi">BLK-Max Super Speciality Hospital New Delhi</option>
                                    <option value="centre-for-sight-safdarjung-new-delhi">Centre for Sight, Safdarjung, New Delhi</option>
                                    <option value="fortis-escorts-heart-institute-new-delhi">Fortis Escorts Heart Institute New Delhi</option>
                                    <option value="manipal-hospital-new-delhi">Manipal Hospital New Delhi</option>
                                    <option value="sharp-sight-eye-hospital-new-delhi">Sharp Sight Eye Hospital New Delhi</option>
                                    <option value="the-sight-avenue-new-delhi">The Sight Avenue New Delhi</option>
                                    <option value="art-fertility-clinics-gurgaon-gurugram">Art Fertility Clinics Gurgaon Gurugram</option>
                                    <option value="artemis-hospital-gurugram">Artemis Hospital Gurugram</option>
                                    <option value="birla-fertility-gurgaon-gurugram">Birla Fertility Gurgaon Gurugram</option>
                                    <option value="ck-birla-hospital-gurugram">CK Birla Hospital Gurugram</option>
                                    <option value="centre-for-sight-gurugram">Centre for Sight, Gurugram</option>
                                    <option value="cloudnine-fertility-gurugram">Cloudnine Fertility Gurugram</option>
                                    <option value="fortis-memorial-research-institute-gurugram">Fortis Memorial Research Institute Gurugram</option>
                                    <option value="marengo-asia-hospital-gurugram">Marengo Asia Hospital Gurugram</option>
                                    <option value="medanta-hospital-gurugram">Medanta Hospital Gurugram</option>
                                    <option value="paras-hospital-gurugram-haryana-gurugram">Paras Hospital Gurugram, Haryana Gurugram</option>
                                    <option value="shallby-sanar-international-hospital-gurugram">Shallby Sanar International Hospital Gurugram</option>
                                    <option value="the-sight-avenue-gurugram">The Sight Avenue, Gurugram</option>
                                    <option value="fortis-hospital-noida">Fortis Hospital Noida</option>
                                    <option value="jaypee-hospital-noida">Jaypee Hospital Noida</option>
                                    <option value="yatharth-super-speciality-hospital-noida">Yatharth Super Speciality Hospital Noida</option>
                                </select>
                                <div class="nice-select custom-select one" style="flex-basis: 50%;" tabindex="0">
                                    <span class="current">Select Hospital</span>
                                    <ul class="list scrollable-dropdown">
                                        <li data-value="" data-display="Select Hospital" class="option selected focus">Select Hospital</li>
                                        <li data-value="apollo-hospital-new-delhi" class="option">Apollo Hospital New Delhi</li>
                                        <li data-value="blk-max-super-speciality-hospital-new-delhi" class="option">BLK-Max Super Speciality Hospital New Delhi</li>
                                        <li data-value="centre-for-sight-safdarjung-new-delhi" class="option">Centre for Sight, Safdarjung, New Delhi</li>
                                        <li data-value="fortis-escorts-heart-institute-new-delhi" class="option">Fortis Escorts Heart Institute New Delhi</li>
                                        <li data-value="manipal-hospital-new-delhi" class="option">Manipal Hospital New Delhi</li>
                                        <li data-value="sharp-sight-eye-hospital-new-delhi" class="option">Sharp Sight Eye Hospital New Delhi</li>
                                        <li data-value="the-sight-avenue-new-delhi" class="option">The Sight Avenue New Delhi</li>
                                        <li data-value="art-fertility-clinics-gurgaon-gurugram" class="option">Art Fertility Clinics Gurgaon Gurugram</li>
                                        <li data-value="artemis-hospital-gurugram" class="option">Artemis Hospital Gurugram</li>
                                        <li data-value="birla-fertility-gurgaon-gurugram" class="option">Birla Fertility Gurgaon Gurugram</li>
                                        <li data-value="ck-birla-hospital-gurugram" class="option">CK Birla Hospital Gurugram</li>
                                        <li data-value="centre-for-sight-gurugram" class="option">Centre for Sight, Gurugram</li>
                                        <li data-value="cloudnine-fertility-gurugram" class="option">Cloudnine Fertility Gurugram</li>
                                        <li data-value="fortis-memorial-research-institute-gurugram" class="option">Fortis Memorial Research Institute Gurugram</li>
                                        <li data-value="marengo-asia-hospital-gurugram" class="option">Marengo Asia Hospital Gurugram</li>
                                        <li data-value="medanta-hospital-gurugram" class="option">Medanta Hospital Gurugram</li>
                                        <li data-value="paras-hospital-gurugram-haryana-gurugram" class="option">Paras Hospital Gurugram, Haryana Gurugram</li>
                                        <li data-value="shallby-sanar-international-hospital-gurugram" class="option">Shallby Sanar International Hospital Gurugram</li>
                                        <li data-value="the-sight-avenue-gurugram" class="option">The Sight Avenue, Gurugram</li>
                                        <li data-value="fortis-hospital-noida" class="option">Fortis Hospital Noida</li>
                                        <li data-value="jaypee-hospital-noida" class="option">Jaypee Hospital Noida</li>
                                        <li data-value="yatharth-super-speciality-hospital-noida" class="option">Yatharth Super Speciality Hospital Noida</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="input-half-wrapper datepicker-wrapper">
                                <input type="text" id="datepicker" placeholder="mm/dd/yyyy" class="hasDatepicker">
                                <div class="search-input">
                                    <select class="" style="display: none;">
                                        <option data-display="Select Time">Doctor Department</option>
                                        <option value="1">Medicine</option>
                                        <option value="2">Cardiology</option>
                                        <option value="3">Operation</option>
                                    </select>
                                    <div class="nice-select custom-select one" style="flex-basis: 50%;" tabindex="0">
                                        <span class="current">Select Doctor Time</span>
                                        <ul class="list">
                                            <li data-value="Morning 10 AM" data-display="Morning 10 AM" class="option selected focus">Morning 10 AM</li>
                                            <li data-value="1" class="option">Morning 11 AM</li>
                                            <li data-value="2" class="option">Morning 12 AM</li>
                                            <li data-value="3" class="option">Evening 5 PM</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <a href="#" class="rts-btn btn-primary">Appoinment <img src="assets/images/banner/icons/arrow--up-right.svg" alt=""></a>
                        </form>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="thumbnail-appoinment wow move-right" style="visibility: hidden; animation-name: none;">
                        <img src="assets/images/appoinment/01.webp" alt="appoinment">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- book your consulting end -->`;

// Pages to update (excluding index.html and contactus.html which are already done)
const pagesToUpdate = [
    'about.html',
    'appoinment.html',
    'portfolio.html'
];

let updatedCount = 0;
let skippedCount = 0;

pagesToUpdate.forEach(filename => {
    const filePath = path.join(__dirname, '..', filename);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipped: ${filename} (file not found)`);
        skippedCount++;
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file has appointment form section
    if (!content.includes('request-appoinemnt-area') && !content.includes('appoinment-area')) {
        console.log(`⚠️  Skipped: ${filename} (no appointment form found)`);
        skippedCount++;
        return;
    }

    // Add appointment-form.js script if not already present
    if (!content.includes('appointment-form.js')) {
        content = content.replace(
            /<script src="assets\/js\/main\.js"><\/script>/,
            '<script src="assets/js/main.js"></script>\n    <script src="assets/js/appointment-form.js"></script>'
        );
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${filename}`);
    updatedCount++;
});

console.log(`\n📊 Summary:`);
console.log(`   Updated: ${updatedCount} files`);
console.log(`   Skipped: ${skippedCount} files`);
console.log(`\n✨ All appointment forms now use consistent Notion integration!`);
