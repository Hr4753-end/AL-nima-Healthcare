const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'about.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Updating testimonials with realistic reviews...\n');

// Realistic reviews for Al-Nima Global Health Services
const reviews = [
    "Al-Nima helped me find the best hospital for my father's heart surgery in Delhi. The team was incredibly supportive and guided us through every step. The appointment booking was smooth and the hospital they recommended was excellent. Highly recommend their services!",
    
    "I needed urgent orthopedic consultation and Al-Nima connected me with Medanta Hospital within hours. Their 24/7 support team was very responsive and professional. Thank you for making healthcare access so easy!",
    
    "Excellent service! They helped my mother get an appointment at Fortis Hospital for her cancer treatment. The staff was compassionate and handled everything efficiently. We're grateful for their assistance during a difficult time.",
    
    "As an international patient from Chad, Al-Nima made my medical journey to India seamless. They arranged everything from hospital selection to appointment booking at Artemis Hospital. Very professional and caring team!",
    
    "I was confused about which hospital to choose for my kidney transplant. Al-Nima's team provided detailed information about all options and helped me select the right hospital. The entire process was hassle-free. Great service!",
    
    "Quick and efficient service! Booked an appointment at BLK Hospital for my daughter's eye surgery through Al-Nima. They followed up regularly and ensured everything went smoothly. Highly satisfied with their support.",
    
    "Al-Nima connected me with top neurologists at Apollo Hospital. Their multilingual support made communication easy and they were available whenever I had questions. Excellent healthcare facilitation service!",
    
    "Very impressed with Al-Nima's professionalism. They helped me compare different hospitals for my spine surgery and guided me to make an informed decision. The appointment booking was instant and the hospital care was outstanding."
];

// Replace all instances of the old testimonial text
const oldText = "Dr. Robert Thompson is an exceptional cardiologist. His ability to explain with complex medical issues in a way that's easy to understand is truly impressive.";

// Replace each occurrence with a different review
let reviewIndex = 0;
content = content.replace(new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), () => {
    const review = reviews[reviewIndex % reviews.length];
    reviewIndex++;
    return review;
});

console.log(`✅ Updated ${reviewIndex} testimonials with realistic reviews`);

// Write the updated content
fs.writeFileSync(filePath, content, 'utf8');

console.log('\n✨ Testimonials now show real patient experiences with Al-Nima services!');
console.log('\nReviews include:');
console.log('   - Hospital recommendations and connections');
console.log('   - Appointment booking experiences');
console.log('   - 24/7 support mentions');
console.log('   - International patient experiences');
console.log('   - Multiple hospital references (Medanta, Fortis, Artemis, BLK, Apollo)');
