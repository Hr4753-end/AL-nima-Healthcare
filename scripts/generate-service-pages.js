const fs = require('fs');
const path = require('path');

// Load hospital data
const hospitalsData = require('../data/hospitals-data.json');

// Get unique departments
const departments = [...new Set(hospitalsData.flatMap(h => h.departments))].sort();

// Service content mapping with descriptions and key points
const serviceContent = {
    "Cardiology": {
        title: "Cardiology Services",
        subtitle: "Expert Heart Care & Cardiovascular Treatment",
        description: "Our cardiology department offers comprehensive heart care services with state-of-the-art diagnostic and treatment facilities. Our expert cardiologists specialize in preventing, diagnosing, and treating heart diseases and cardiovascular conditions.",
        keyPoints: [
            "Advanced cardiac diagnostics including ECG, Echo, and stress tests",
            "Interventional cardiology procedures",
            "Heart failure management",
            "Preventive cardiology and risk assessment",
            "24/7 emergency cardiac care"
        ]
    },
    "Orthopedic & Joint Replacement": {
        title: "Orthopedics & Joint Replacement",
        subtitle: "Advanced Bone & Joint Care Solutions",
        description: "Our orthopedic department provides comprehensive care for musculoskeletal conditions, from sports injuries to complex joint replacements. We use minimally invasive techniques and advanced prosthetics for optimal outcomes.",
        keyPoints: [
            "Total joint replacement (hip, knee, shoulder)",
            "Arthroscopic surgery",
            "Sports medicine and injury treatment",
            "Spine surgery and pain management",
            "Pediatric orthopedics"
        ]
    },
    "Neurology": {
        title: "Neurology Services",
        subtitle: "Comprehensive Brain & Nervous System Care",
        description: "Our neurology department specializes in diagnosing and treating disorders of the brain, spinal cord, and nervous system. We offer advanced neurological care with cutting-edge technology and experienced neurologists.",
        keyPoints: [
            "Stroke care and prevention",
            "Epilepsy management",
            "Movement disorders (Parkinson's, tremors)",
            "Headache and migraine treatment",
            "Neuromuscular disorders"
        ]
    },
    "Oncology": {
        title: "Oncology Services",
        subtitle: "Comprehensive Cancer Care & Treatment",
        description: "Our oncology department provides multidisciplinary cancer care with the latest treatment modalities. We offer personalized treatment plans combining surgery, chemotherapy, radiation, and immunotherapy.",
        keyPoints: [
            "Medical oncology and chemotherapy",
            "Radiation oncology",
            "Surgical oncology",
            "Immunotherapy and targeted therapy",
            "Palliative care and pain management"
        ]
    },
    "Urology & Kidney Transplant": {
        title: "Urology & Kidney Transplant",
        subtitle: "Advanced Urological Care & Transplant Services",
        description: "Our urology department offers comprehensive care for urinary tract and male reproductive system disorders. We specialize in minimally invasive procedures and kidney transplantation.",
        keyPoints: [
            "Kidney transplant surgery",
            "Prostate treatment (BPH, cancer)",
            "Kidney stone management",
            "Urological cancer treatment",
            "Male infertility treatment"
        ]
    },
    "Liver Transplant & GI & HPB Surgery": {
        title: "Liver Transplant & GI Surgery",
        subtitle: "Advanced Hepatobiliary & Gastrointestinal Care",
        description: "Our department specializes in liver transplantation and complex gastrointestinal surgeries. We provide comprehensive care for liver, pancreas, and biliary tract disorders.",
        keyPoints: [
            "Liver transplant surgery",
            "Pancreatic surgery",
            "Biliary tract surgery",
            "Gastrointestinal cancer surgery",
            "Minimally invasive GI procedures"
        ]
    },
    "Cardiac Thoracic & Vascular Surgery": {
        title: "Cardiac & Thoracic Surgery",
        subtitle: "Expert Heart & Chest Surgery Services",
        description: "Our cardiac and thoracic surgery department performs complex heart and chest surgeries with precision. We specialize in coronary bypass, valve replacement, and thoracic procedures.",
        keyPoints: [
            "Coronary artery bypass grafting (CABG)",
            "Heart valve repair and replacement",
            "Thoracic surgery",
            "Vascular surgery",
            "Minimally invasive cardiac procedures"
        ]
    },
    "Paediatric Cardiac Care": {
        title: "Pediatric Cardiac Care",
        subtitle: "Specialized Heart Care for Children",
        description: "Our pediatric cardiology department provides comprehensive heart care for infants, children, and adolescents. We specialize in congenital heart defects and pediatric cardiac surgery.",
        keyPoints: [
            "Congenital heart defect treatment",
            "Pediatric cardiac surgery",
            "Fetal echocardiography",
            "Pediatric interventional cardiology",
            "Long-term cardiac follow-up"
        ]
    },
    "Spine & Scoliosis Surgery": {
        title: "Spine & Scoliosis Surgery",
        subtitle: "Advanced Spinal Care & Correction",
        description: "Our spine surgery department offers comprehensive treatment for spinal disorders, from degenerative conditions to complex deformities. We use minimally invasive techniques whenever possible.",
        keyPoints: [
            "Scoliosis correction surgery",
            "Spinal fusion procedures",
            "Disc replacement surgery",
            "Minimally invasive spine surgery",
            "Spinal tumor treatment"
        ]
    },
    "Opthamology": {
        title: "Ophthalmology Services",
        subtitle: "Comprehensive Eye Care & Vision Solutions",
        description: "Our ophthalmology department provides complete eye care services, from routine eye exams to complex surgical procedures. We use the latest technology for diagnosis and treatment.",
        keyPoints: [
            "Cataract surgery",
            "LASIK and refractive surgery",
            "Retina and vitreous surgery",
            "Glaucoma treatment",
            "Pediatric ophthalmology"
        ]
    },
    "Nephrology": {
        title: "Nephrology Services",
        subtitle: "Expert Kidney Care & Dialysis",
        description: "Our nephrology department specializes in kidney disease diagnosis and treatment. We offer comprehensive care including dialysis, kidney disease management, and transplant support.",
        keyPoints: [
            "Chronic kidney disease management",
            "Hemodialysis and peritoneal dialysis",
            "Kidney transplant evaluation",
            "Hypertension management",
            "Acute kidney injury treatment"
        ]
    },
    "Haemato Oncology & BMT": {
        title: "Hematology & Bone Marrow Transplant",
        subtitle: "Advanced Blood Cancer & BMT Services",
        description: "Our hematology and BMT department provides specialized care for blood disorders and cancers. We perform autologous and allogeneic bone marrow transplants with excellent outcomes.",
        keyPoints: [
            "Bone marrow transplantation",
            "Leukemia and lymphoma treatment",
            "Multiple myeloma care",
            "Aplastic anemia treatment",
            "Stem cell transplantation"
        ]
    },
    "Neuro Surgery": {
        title: "Neurosurgery Services",
        subtitle: "Advanced Brain & Spine Surgery",
        description: "Our neurosurgery department performs complex brain and spine surgeries with precision. We use advanced imaging and minimally invasive techniques for optimal outcomes.",
        keyPoints: [
            "Brain tumor surgery",
            "Spinal cord surgery",
            "Aneurysm treatment",
            "Traumatic brain injury care",
            "Minimally invasive neurosurgery"
        ]
    },
    "Cosmetic & Plastic Surgery": {
        title: "Cosmetic & Plastic Surgery",
        subtitle: "Aesthetic & Reconstructive Solutions",
        description: "Our plastic surgery department offers both cosmetic and reconstructive procedures. We combine artistry with surgical expertise to achieve natural-looking results.",
        keyPoints: [
            "Facial cosmetic surgery",
            "Body contouring procedures",
            "Breast surgery",
            "Reconstructive surgery",
            "Non-surgical aesthetic treatments"
        ]
    },
    "ENT & Cochlear Implant": {
        title: "ENT & Cochlear Implant",
        subtitle: "Ear, Nose & Throat Specialist Care",
        description: "Our ENT department provides comprehensive care for ear, nose, and throat disorders. We specialize in cochlear implants and advanced ENT surgeries.",
        keyPoints: [
            "Cochlear implant surgery",
            "Sinus surgery",
            "Tonsillectomy and adenoidectomy",
            "Hearing loss treatment",
            "Voice and swallowing disorders"
        ]
    },
    "General & Minimally Invasive Surgery": {
        title: "General & Laparoscopic Surgery",
        subtitle: "Advanced Minimally Invasive Procedures",
        description: "Our general surgery department offers a wide range of surgical procedures with emphasis on minimally invasive techniques for faster recovery and better outcomes.",
        keyPoints: [
            "Laparoscopic surgery",
            "Hernia repair",
            "Gallbladder surgery",
            "Appendectomy",
            "Colorectal surgery"
        ]
    },
    "Gastroenterology": {
        title: "Gastroenterology Services",
        subtitle: "Digestive System Care & Treatment",
        description: "Our gastroenterology department specializes in diagnosing and treating digestive system disorders. We offer advanced endoscopic procedures and comprehensive GI care.",
        keyPoints: [
            "Endoscopy and colonoscopy",
            "Inflammatory bowel disease treatment",
            "Liver disease management",
            "Pancreatic disorder care",
            "GI cancer screening"
        ]
    },
    "Dermatology & Cosmetology": {
        title: "Dermatology & Cosmetology",
        subtitle: "Skin Care & Aesthetic Solutions",
        description: "Our dermatology department provides comprehensive skin care services, from medical dermatology to cosmetic procedures. We treat all skin, hair, and nail conditions.",
        keyPoints: [
            "Medical dermatology",
            "Cosmetic dermatology",
            "Laser treatments",
            "Hair restoration",
            "Skin cancer treatment"
        ]
    },
    "Dentistry": {
        title: "Dentistry Services",
        subtitle: "Comprehensive Dental Care Solutions",
        description: "Our dental department offers complete oral health care services. From preventive care to complex dental procedures, we ensure your smile stays healthy and beautiful.",
        keyPoints: [
            "Preventive dentistry",
            "Dental implants",
            "Orthodontics",
            "Root canal treatment",
            "Cosmetic dentistry"
        ]
    },
    "Obstetrics & Gynaecology": {
        title: "Obstetrics & Gynecology",
        subtitle: "Women's Health & Maternity Care",
        description: "Our OB/GYN department provides comprehensive women's health services, from routine care to high-risk pregnancy management and gynecological surgeries.",
        keyPoints: [
            "Prenatal and postnatal care",
            "High-risk pregnancy management",
            "Gynecological surgery",
            "Infertility treatment",
            "Menopause management"
        ]
    },
    "IVF, Reproductive Medicine": {
        title: "IVF & Reproductive Medicine",
        subtitle: "Advanced Fertility Treatment Solutions",
        description: "Our fertility center offers comprehensive reproductive medicine services with state-of-the-art IVF laboratory. We help couples achieve their dream of parenthood.",
        keyPoints: [
            "In-vitro fertilization (IVF)",
            "Intrauterine insemination (IUI)",
            "Egg and sperm freezing",
            "Male infertility treatment",
            "Genetic testing and counseling"
        ]
    },
    "Radiation Oncology": {
        title: "Radiation Oncology",
        subtitle: "Precision Cancer Radiation Therapy",
        description: "Our radiation oncology department uses advanced radiation therapy techniques to treat cancer with precision while minimizing damage to healthy tissue.",
        keyPoints: [
            "External beam radiation therapy",
            "Intensity-modulated radiation therapy (IMRT)",
            "Stereotactic radiosurgery",
            "Brachytherapy",
            "Palliative radiation"
        ]
    },
    "Medical Oncology": {
        title: "Medical Oncology",
        subtitle: "Chemotherapy & Targeted Cancer Treatment",
        description: "Our medical oncology department provides systemic cancer treatment including chemotherapy, immunotherapy, and targeted therapy with personalized treatment plans.",
        keyPoints: [
            "Chemotherapy administration",
            "Immunotherapy",
            "Targeted therapy",
            "Hormonal therapy",
            "Clinical trials"
        ]
    },
    "Surgical Oncology": {
        title: "Surgical Oncology",
        subtitle: "Expert Cancer Surgery Services",
        description: "Our surgical oncology department specializes in cancer surgery with focus on complete tumor removal while preserving organ function and quality of life.",
        keyPoints: [
            "Tumor resection surgery",
            "Minimally invasive cancer surgery",
            "Reconstructive surgery",
            "Lymph node surgery",
            "Palliative surgery"
        ]
    },
    "Gynaecological Oncology": {
        title: "Gynecological Oncology",
        subtitle: "Women's Cancer Care Specialists",
        description: "Our gynecological oncology department provides specialized care for cancers of the female reproductive system with comprehensive treatment options.",
        keyPoints: [
            "Ovarian cancer treatment",
            "Cervical cancer care",
            "Uterine cancer surgery",
            "Minimally invasive surgery",
            "Chemotherapy for gynecologic cancers"
        ]
    },
    "Neurointerventional Surgery": {
        title: "Neurointerventional Surgery",
        subtitle: "Minimally Invasive Brain & Spine Procedures",
        description: "Our neurointerventional surgery department performs minimally invasive procedures for brain and spine conditions using advanced imaging guidance.",
        keyPoints: [
            "Aneurysm coiling",
            "Stroke intervention",
            "AVM treatment",
            "Spinal procedures",
            "Tumor embolization"
        ]
    },
    "Paediatric Surgery": {
        title: "Pediatric Surgery",
        subtitle: "Specialized Surgical Care for Children",
        description: "Our pediatric surgery department provides surgical care for infants, children, and adolescents with congenital and acquired conditions requiring surgery.",
        keyPoints: [
            "Neonatal surgery",
            "Congenital defect correction",
            "Pediatric trauma care",
            "Minimally invasive pediatric surgery",
            "Pediatric urology"
        ]
    }
};

// Generate slug from department name
function generateSlug(name) {
    return name.toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Generate service page HTML
function generateServicePage(department) {
    const slug = generateSlug(department);
    const content = serviceContent[department] || {
        title: department,
        subtitle: `Expert ${department} Services`,
        description: `Our ${department} department provides comprehensive care with state-of-the-art facilities and experienced specialists.`,
        keyPoints: [
            "Advanced diagnostic services",
            "Expert medical team",
            "State-of-the-art technology",
            "Personalized treatment plans",
            "24/7 emergency care"
        ]
    };

    // Get hospitals offering this service
    const hospitalsList = hospitalsData
        .filter(h => h.departments.includes(department))
        .map(h => ({
            name: h.name,
            city: h.city,
            id: h.id
        }));

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/x-icon" href="assets/images/fav.png">
    <title>${content.title} - Medical & Health Care</title>
    <meta name="description" content="${content.description}">
    <link rel="stylesheet" href="assets/css/plugins/plugins.css">
    <link rel="stylesheet" href="assets/css/plugins/magnifying-popup.css">
    <link rel="stylesheet" href="assets/css/vendor/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/hospitals.css">
    <link rel="stylesheet" href="assets/css/services.css">
</head>

<body class="loaded">
    <header class="header-one header--sticky">
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
    </header>

    <div class="rts-breadcrumb-area bg_image rts-section-gap">
        <div class="container ptb--40">
            <div class="row">
                <div class="breadcrumb-area-wrapper">
                    <h1 class="title">${content.title}</h1>
                    <div class="nav-bread-crumb">
                        <a href="index.html">Home</a>
                        <i class="fa-solid fa-chevron-right"></i>
                        <a href="hospitals.html">Services</a>
                        <i class="fa-solid fa-chevron-right"></i>
                        <a href="#" class="current">${department}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="rts-service-details-area rts-section-gap">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="service-details-content">
                        <div class="title-area">
                            <span class="pre-title">
                                <img src="assets/images/banner/icon/12.svg" alt="">
                                ${content.subtitle}
                            </span>
                            <h2 class="title">${content.title}</h2>
                        </div>
                        
                        <div class="service-description mt--30">
                            <p>${content.description}</p>
                        </div>

                        <div class="service-features mt--40">
                            <h3 class="subtitle">Our Services Include:</h3>
                            <ul class="feature-list">
                                ${content.keyPoints.map(point => `<li><i class="fa-light fa-check"></i> ${point}</li>`).join('\n                                ')}
                            </ul>
                        </div>

                        <div class="cta-section mt--50">
                            <div class="cta-box">
                                <h3>Need ${department} Care?</h3>
                                <p>Book an appointment with our expert specialists today</p>
                                <a href="appoinment.html" class="rts-btn btn-primary">Book Appointment</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="service-sidebar">
                        <div class="sidebar-widget">
                            <h3 class="widget-title">Hospitals Offering This Service</h3>
                            <div class="hospital-list">
                                ${hospitalsList.map(h => `
                                <div class="hospital-item">
                                    <h4>${h.name}</h4>
                                    <p><i class="fa-light fa-location-dot"></i> ${h.city}</p>
                                    <a href="hospital-details.html?id=${h.id}" class="view-link">View Details <i class="fa-light fa-arrow-right"></i></a>
                                </div>
                                `).join('')}
                            </div>
                            <a href="hospitals.html?department=${encodeURIComponent(department)}" class="rts-btn btn-primary w-100 mt--20">
                                View All Hospitals
                            </a>
                        </div>

                        <div class="sidebar-widget mt--30">
                            <h3 class="widget-title">Quick Contact</h3>
                            <div class="contact-info">
                                <p><strong>📧 Email:</strong></p>
                                <p><a href="mailto:alnimaglobalhealthservices@gmail.com">alnimaglobalhealthservices@gmail.com</a></p>
                                <p><strong>📱 WhatsApp Chad:</strong></p>
                                <p><a href="https://wa.me/2356850001">+235 6850 0001</a></p>
                                <p><a href="https://wa.me/2356752524">+235 6752 5245</a></p>
                                <p><strong>📱 WhatsApp India:</strong></p>
                                <p><a href="https://wa.me/919217150972">+91 92171 50972</a></p>
                                <p><strong>🕐 Availability:</strong></p>
                                <p>24/7 Emergency Services</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- rts footer area start -->
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
    <!-- rts footer area end -->

    <script src="assets/js/vendor/jquery.min.js"></script>
    <script src="assets/js/vendor/bootstrap.min.js"></script>
</body>
</html>`;

    return html;
}

// Generate all service pages
console.log(`Generating service pages for ${departments.length} departments...\n`);

departments.forEach(department => {
    const slug = generateSlug(department);
    const filename = `service-${slug}.html`;
    const filepath = path.join(__dirname, '..', filename);
    const html = generateServicePage(department);
    
    fs.writeFileSync(filepath, html);
    console.log(`✓ Created: ${filename}`);
});

console.log(`\n✓ Successfully generated ${departments.length} service pages!`);
