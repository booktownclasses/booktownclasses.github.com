// coding.js – animate circular progress bars when they come into view
const progressCircles = document.querySelectorAll('.progress-circle');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const circle = entry.target;
      const percent = circle.closest('.circular-progress').getAttribute('data-percent');
      const circumference = 314;
      const dashoffset = circumference - (circumference * percent) / 100;
      circle.style.strokeDashoffset = dashoffset;
      observer.unobserve(circle);
    }
  });
}, { threshold: 0.5 });
progressCircles.forEach(circle => observer.observe(circle));