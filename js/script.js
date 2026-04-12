// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
function updateCarousel() {
  const container = document.querySelector('.carousel-container');
  if (container) container.style.transform = `translateX(-${currentSlide * 100}%)`;
}
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => { 
    currentSlide = (currentSlide + 1) % totalSlides; 
    updateCarousel(); 
  });
  prevBtn.addEventListener('click', () => { 
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; 
    updateCarousel(); 
  });
}
setInterval(() => { 
  if (slides.length) { 
    currentSlide = (currentSlide + 1) % totalSlides; 
    updateCarousel(); 
  } 
}, 5000);

// FAQ Dropdown
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const questionDiv = item.querySelector('.faq-question');
  questionDiv.addEventListener('click', (e) => {
    e.stopPropagation();
    faqItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
      }
    });
    item.classList.toggle('active');
  });
});

// Animated Stats Counter
function animateStats() {
  const satisfactionEl = document.getElementById('statSatisfaction');
  const studentsEl = document.getElementById('statStudents');
  const ratingEl = document.getElementById('statRating');
  if (!satisfactionEl) return;
  
  let satisfaction = 0;
  let students = 0;
  let rating = 0;
  const targetSatisfaction = 85;
  const targetStudents = 100;
  const targetRating = 4.9;
  
  const interval = setInterval(() => {
    let changed = false;
    if (satisfaction < targetSatisfaction) {
      satisfaction = Math.min(satisfaction + 5, targetSatisfaction);
      satisfactionEl.textContent = satisfaction;
      changed = true;
    }
    if (students < targetStudents) {
      students = Math.min(students + 10, targetStudents);
      studentsEl.textContent = students;
      changed = true;
    }
    if (rating < targetRating) {
      rating = Math.min(rating + 0.3, targetRating);
      ratingEl.textContent = rating.toFixed(1);
      changed = true;
    }
    if (!changed) clearInterval(interval);
  }, 50);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      observer.unobserve(entry.target);
    }
  });
});
const aboutStats = document.querySelector('.about-stats');
if (aboutStats) observer.observe(aboutStats);

// Scroll-triggered fade-up animation for cards
const fadeElements = document.querySelectorAll('.program-card, .advantage-card, .faculty-card, .testimonial');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});

// Contact Form Handler
const formBtn = document.getElementById('submitFormBtn');
let feedbackDiv = document.createElement('div');
feedbackDiv.className = 'form-message';
const contactFormDiv = document.getElementById('contactForm');
if (contactFormDiv) contactFormDiv.appendChild(feedbackDiv);

if (formBtn) {
  formBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const studentClass = document.getElementById('studentClass').value;
    const message = document.getElementById('message').value.trim();
    const batch = document.getElementById('preferredBatch').value;

    if (!name || !phone || !studentClass) {
      feedbackDiv.style.color = "#f87171";
      feedbackDiv.innerHTML = "❌ Please provide your name, phone, and select student's class.";
      return;
    }

    const inquiry = { 
      name, phone, studentClass, batch, 
      message: message || "No additional message", 
      date: new Date().toLocaleString() 
    };
    
    const whatsappNumber = '919414700737';
    const whatsappMessage = `📚 *BookTown Inquiry*%0A👤 Name: ${inquiry.name}%0A📞 Phone: ${inquiry.phone}%0A🎓 Class: ${inquiry.studentClass}%0A⏰ Batch: ${inquiry.batch || 'Not specified'}%0A💬 Message: ${inquiry.message}%0A🕒 ${inquiry.date}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

    feedbackDiv.style.color = "#4ade80";
    feedbackDiv.innerHTML = `✅ Thanks ${name}! Opening WhatsApp to connect with our team. We'll reach out shortly.`;
    document.getElementById('message').value = '';
    
    setTimeout(() => {
      if (feedbackDiv.innerHTML.includes("Thanks")) feedbackDiv.style.opacity = "0.8";
    }, 5000);
  });
}


// Ripple effect for buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('click', function(e) {
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    let ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255,255,255,0.6)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.transition = 'width 0.4s, height 0.4s';
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => {
      ripple.style.width = '200px';
      ripple.style.height = '200px';
    }, 10);
    setTimeout(() => ripple.remove(), 400);
  });
});