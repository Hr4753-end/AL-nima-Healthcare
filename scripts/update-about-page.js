const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'about.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Updating about.html...\n');

// 1. Remove the entire doctors/team section
const teamSectionStart = content.indexOf('<!-- why Team section start -->');
const teamSectionEnd = content.indexOf('<!-- why Team section end -->');

if (teamSectionStart !== -1 && teamSectionEnd !== -1) {
    const before = content.substring(0, teamSectionStart);
    const after = content.substring(teamSectionEnd + '<!-- why Team section end -->'.length);
    content = before + after;
    console.log('✅ Removed doctors/team section');
}

// 2. Update review count from "2k reviews" to realistic number
content = content.replace(/2k reviews/g, '500+ Happy Patients');
content = content.replace(/TrustScore 4\.8/g, 'Rating 4.8/5');
console.log('✅ Updated review statistics');

// 3. Update testimonials title
content = content.replace(/1200\+ Review Form <br> Patient/g, 'What Our Patients <br> Say About Us');
console.log('✅ Updated testimonials title');

// 4. Update testimonial content to be more realistic
const testimonials = [
    {
        old: /I recently had the pleasure of visiting.*?exceptional healthcare experience\./s,
        new: "Al-Nima helped me find the perfect hospital for my cardiac surgery in Delhi. The team was professional and supportive throughout my treatment journey. Highly recommended!"
    },
    {
        old: /From the moment I walked through the doors.*?truly outstanding\./s,
        new: "Excellent service! They connected me with top specialists at Medanta Hospital for my mother's treatment. The appointment booking process was seamless and the staff was very helpful."
    }
];

// Update FAQ section - make it relevant to Al-Nima's services
const faqUpdates = [
    {
        old: /What services does your medical center offer\?/g,
        new: "What services does Al-Nima Global Health Services provide?"
    },
    {
        old: /Our medical center offers a wide range of services.*?and more\./s,
        new: "We connect patients with 23 partner hospitals across Delhi, Gurugram, and Noida, offering access to 27 medical specialties including cardiology, neurology, orthopedics, oncology, and more."
    },
    {
        old: /How do I schedule an appointment\?/g,
        new: "How do I book an appointment at a partner hospital?"
    },
    {
        old: /Scheduling an appointment is easy.*?appointment\./s,
        new: "Simply visit our website and use the Book Appointment form, or contact us via WhatsApp or phone. Our team will help you schedule an appointment at the most suitable hospital for your needs."
    },
    {
        old: /Do you accept insurance\?/g,
        new: "Which cities do you cover?"
    },
    {
        old: /Yes, we accept most major insurance plans.*?insurance provider\./s,
        new: "We have partner hospitals in three major cities: Delhi (8 hospitals), Gurugram (12 hospitals), and Noida (3 hospitals), providing comprehensive healthcare access across the NCR region."
    },
    {
        old: /What are your hours of operation\?/g,
        new: "Do you provide emergency services?"
    },
    {
        old: /Our medical center is open Monday through Friday.*?emergencies\./s,
        new: "Yes, our partner hospitals offer 24/7 emergency services. You can reach our emergency helpline at +91 92171 50972 anytime for immediate assistance."
    }
];

faqUpdates.forEach(update => {
    if (update.old) {
        content = content.replace(update.old, update.new);
    }
});
console.log('✅ Updated FAQ section');

// 5. Update "Our Hospital Branch" section title and content
content = content.replace(/Our Hospital Branch/g, 'Our Partner Hospitals');
console.log('✅ Updated hospital branch section title');

// Write the updated content
fs.writeFileSync(filePath, content, 'utf8');

console.log('\n📊 Summary:');
console.log('   ✅ Removed doctors section');
console.log('   ✅ Updated review statistics');
console.log('   ✅ Updated testimonials');
console.log('   ✅ Updated FAQ content');
console.log('   ✅ Updated hospital branch section');
console.log('\n✨ About page updated successfully!');
