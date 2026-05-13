// ========================
// 1. MOBILE MENU (global)
// ========================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    mobileMenuBtn.setAttribute('aria-expanded', navLinks.classList.contains('show'));
  });
}

// ========================
// 2. CAROUSEL (only if .carousel-slide exists)
// ========================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
if (totalSlides > 0) {
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
    currentSlide = (currentSlide + 1) % totalSlides; 
    updateCarousel(); 
  }, 5000);
}

// ========================
// 3. FAQ DROPDOWN
// ========================
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length) {
  faqItems.forEach(item => {
    const questionDiv = item.querySelector('.faq-question');
    if (questionDiv) {
      questionDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        item.classList.toggle('active');
      });
    }
  });
}

// ========================
// 4. ANIMATED STATS COUNTER
// ========================
function animateStats() {
  const satisfactionEl = document.getElementById('statSatisfaction');
  const studentsEl = document.getElementById('statStudents');
  const ratingEl = document.getElementById('statRating');
  if (!satisfactionEl) return;
  
  let satisfaction = 0, students = 0, rating = 0;
  const targetSatisfaction = 85, targetStudents = 100, targetRating = 4.9;
  
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

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  });
  statsObserver.observe(aboutStats);
}

// ========================
// 5. FADE-UP ANIMATION FOR CARDS
// ========================
const fadeElements = document.querySelectorAll('.program-card, .advantage-card, .faculty-card, .testimonial');
if (fadeElements.length) {
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
}

// ========================
// 6. CONTACT FORM HANDLER
// ========================
const formBtn = document.getElementById('submitFormBtn');
let feedbackDiv = null;
const contactFormDiv = document.getElementById('contactForm');
if (contactFormDiv) {
  feedbackDiv = document.createElement('div');
  feedbackDiv.className = 'form-message';
  contactFormDiv.appendChild(feedbackDiv);
}
if (formBtn && feedbackDiv) {
  formBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const studentClass = document.getElementById('studentClass')?.value || '';
    const message = document.getElementById('message')?.value.trim() || '';
    const batch = document.getElementById('preferredBatch')?.value || '';

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
    if (document.getElementById('message')) document.getElementById('message').value = '';
    
    setTimeout(() => {
      if (feedbackDiv.innerHTML.includes("Thanks")) feedbackDiv.style.opacity = "0.8";
    }, 5000);
  });
}

// ========================
// 7. RIPPLE EFFECT FOR BUTTONS
// ========================
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

// ========================
// 8. COPY CODE (for tutorial pages)
// ========================
window.copyCode = function(button) {
  const pre = button.closest('.code-block').querySelector('pre');
  if (!pre) return;
  const code = pre.textContent;
  navigator.clipboard.writeText(code).then(() => {
    button.classList.add('copied');
    const icon = button.querySelector('i');
    icon.classList.remove('fa-copy');
    icon.classList.add('fa-check');
    setTimeout(() => {
      button.classList.remove('copied');
      icon.classList.remove('fa-check');
      icon.classList.add('fa-copy');
    }, 2000);
  }).catch(err => console.warn('Copy failed', err));
};

// ========================
// 9. SIDEBAR FUNCTIONALITY (tutorial pages)
// ========================
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu inside nav (for the sidebar toggle if present)
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinksElem = document.getElementById('navLinks');
  if (mobileBtn && navLinksElem) {
    // avoid duplicate event if already attached above? keep both; they work.
    mobileBtn.addEventListener('click', () => {
      navLinksElem.classList.toggle('active');
      mobileBtn.setAttribute('aria-expanded', navLinksElem.classList.contains('active'));
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksElem.classList.remove('active');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sidebar collapse button
  const sidebarToggle = document.getElementById('sidebarToggleBtn');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      const mainContainer = document.querySelector('.main-container');
      if (mainContainer) mainContainer.classList.toggle('sidebar-collapsed');
    });
  }

  // Collapsible sidebar sections (Python Tutorial heading)
  function initSidebarCollapse() {
    const sections = document.querySelectorAll('.sidebar-section');
    sections.forEach(section => {
      const titleDiv = section.querySelector('.sidebar-title');
      if (!titleDiv || titleDiv.getAttribute('data-collapsible') === 'true') return;

      if (!titleDiv.querySelector('.toggle-icon')) {
        const chevron = document.createElement('i');
        chevron.className = 'fas fa-chevron-down toggle-icon';
        chevron.setAttribute('aria-hidden', 'true');
        titleDiv.appendChild(chevron);
      }

      const isCollapsed = section.classList.contains('collapsed');
      titleDiv.setAttribute('aria-expanded', !isCollapsed);

      titleDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        section.classList.toggle('collapsed');
        const nowCollapsed = section.classList.contains('collapsed');
        titleDiv.setAttribute('aria-expanded', !nowCollapsed);
      });

      titleDiv.setAttribute('data-collapsible', 'true');
      titleDiv.style.cursor = 'pointer';
    });
  }
  initSidebarCollapse();

  // Scroll spy for page tracker
  const trackerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (!id) return;
      const link = document.querySelector(`.page-tracker a[href="#${id}"]`);
      if (link) {
        if (entry.isIntersecting) {
          document.querySelectorAll('.page-tracker a').forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }, { rootMargin: '-10% 0px -80% 0px', threshold: 0 });

  document.querySelectorAll('.concept-card h3, .concept-card h4').forEach(heading => {
    if (heading.id) trackerObserver.observe(heading);
  });
  const practiceCard = document.getElementById('practice-problems');
  if (practiceCard) trackerObserver.observe(practiceCard);
  const unsolvedCard = document.getElementById('unsolved-exercises');
  if (unsolvedCard) trackerObserver.observe(unsolvedCard);
});



document.addEventListener('DOMContentLoaded', function () {
  const headerContainer = document.getElementById('header-container');
  if (!headerContainer) return; // skip if no placeholder

  fetch('header_bar.html') // path relative to the page, adjust if needed
    .then(res => {
      if (!res.ok) throw new Error('Header not found');
      return res.text();
    })
    .then(html => {
      headerContainer.innerHTML = html;

      // Highlight the current page link
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const navLinks = document.querySelectorAll('.nav-links a');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Compare last part of href with current page filename
        const linkFile = href.split('/').pop();
        link.classList.toggle('active', linkFile === currentPage);
      });

      // Activate mobile menu after the navbar is in the DOM
      initMobileMenu();
    })
    .catch(err => console.error('Header load error:', err));
});

function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('navLinks');
  if (!btn || !nav) return;

  btn.addEventListener('click', function () {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('active');
  });
}