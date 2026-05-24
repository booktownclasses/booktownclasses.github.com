    (function() {
      // ==================== TAB SWITCHING WITH PARTICLES ====================
      const tabBtns = document.querySelectorAll('.tab-btn');
      const tabPanels = document.querySelectorAll('.tab-panel');

      function createParticles(element, event) {
        const emojis = ['⚡','💻','✨','🚀','💡','🔥','🌟','💥','🧠','💾'];
        const rect = element.getBoundingClientRect();
        const centerX = event.clientX - rect.left;
        const centerY = event.clientY - rect.top;
        for (let i = 0; i < 10; i++) {
          const particle = document.createElement('span');
          particle.className = 'particle-emoji';
          particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
          particle.style.left = centerX + 'px';
          particle.style.top = centerY + 'px';
          const angle = Math.random() * 2 * Math.PI;
          const distance = 35 + Math.random() * 70;
          particle.style.setProperty('--px', Math.cos(angle) * distance + 'px');
          particle.style.setProperty('--py', Math.sin(angle) * distance + 'px');
          element.appendChild(particle);
          setTimeout(() => particle.remove(), 750);
        }
      }

      tabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
          tabBtns.forEach(b => b.classList.remove('active'));
          tabPanels.forEach(p => p.classList.remove('active'));
          this.classList.add('active');
          const targetId = this.getAttribute('data-tab');
          const targetPanel = document.getElementById(targetId);
          if (targetPanel) targetPanel.classList.add('active');
          createParticles(this, e);
        });
      });

      // ==================== STAGE CAROUSEL ====================
      const stageCards = document.querySelectorAll('.stage-card');
      const stageDetail = document.getElementById('stageDetail');
      const detailContent = document.getElementById('detailContent');
      const progressFill = document.getElementById('journeyProgressFill');

      stageCards.forEach(card => {
        card.addEventListener('click', function(e) {
          stageCards.forEach(c => c.classList.remove('active'));
          this.classList.add('active');
          detailContent.innerHTML = this.getAttribute('data-detail');
          stageDetail.classList.add('open');
          const stageNum = parseInt(this.getAttribute('data-stage'));
          progressFill.style.width = (stageNum / stageCards.length * 100) + '%';
          createParticles(this, e);
        });
      });

      // Auto-activate first stage
      if (stageCards.length > 0) {
        stageCards[0].classList.add('active');
        detailContent.innerHTML = stageCards[0].getAttribute('data-detail');
        stageDetail.classList.add('open');
        progressFill.style.width = (1 / stageCards.length * 100) + '%';
      }

      // ==================== ANIMATE LANGUAGE BARS ON SCROLL ====================
      const langBars = document.querySelectorAll('.lang-bar-fill');
      const animatedBars = new Set();

      function animateLangBars() {
        langBars.forEach(bar => {
          if (animatedBars.has(bar)) return;
          const rect = bar.getBoundingClientRect();
          if (rect.top < window.innerHeight - 60 && rect.bottom > 0) {
            bar.style.width = bar.getAttribute('data-width') + '%';
            animatedBars.add(bar);
          }
        });
      }
      window.addEventListener('scroll', animateLangBars);
      window.addEventListener('load', animateLangBars);
      setTimeout(animateLangBars, 300);

      // ==================== ANIMATE SPEED CHART BARS ====================
      const speedBars = document.querySelectorAll('.speed-chart .bar');
      const animatedSpeedBars = new Set();
      function animateSpeedBars() {
        speedBars.forEach(bar => {
          if (animatedSpeedBars.has(bar)) return;
          const rect = bar.getBoundingClientRect();
          if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
            const origHeight = bar.style.height;
            bar.style.height = '0px';
            requestAnimationFrame(() => { bar.style.height = origHeight; });
            animatedSpeedBars.add(bar);
          }
        });
      }
      window.addEventListener('scroll', animateSpeedBars);
      setTimeout(animateSpeedBars, 400);

      // ==================== COPY CODE ====================
      window.copyCode = function(btn) {
        const codeBlock = btn.closest('.code-block');
        const code = codeBlock ? codeBlock.querySelector('code') : null;
        const textToCopy = code ? code.textContent : '';
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
          btn.style.background = 'rgba(16, 185, 129, 0.5)';
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
          }, 1800);
        }).catch(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-times"></i> Oops';
          setTimeout(() => { btn.innerHTML = originalHTML; }, 1500);
        });
      };

      // ==================== SMOOTH SCROLL PAGE TRACKER ====================
      document.querySelectorAll('.page-tracker a').forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            target.style.boxShadow = '0 0 30px rgba(79, 70, 229, 0.3)';
            setTimeout(() => { target.style.boxShadow = ''; }, 1500);
          }
        });
      });

      console.log('🚀 Computer Fundamentals & Python – Professional Edition ready.');
    })();



    // Animate comparison bars when they come into view
(function() {
  const compareBars = document.querySelectorAll('.compare-bar-fill');
  const animatedCompareBars = new Set();

  function animateCompareBars() {
    compareBars.forEach(bar => {
      if (animatedCompareBars.has(bar)) return;
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth + '%';
        animatedCompareBars.add(bar);
      }
    });
  }

  window.addEventListener('scroll', animateCompareBars);
  window.addEventListener('load', animateCompareBars);
  // Trigger once after a small delay to catch visible bars
  setTimeout(animateCompareBars, 200);
})();

// ==================== SCROLL SPY FOR PAGE TRACKER ====================
(function() {
  const trackerLinks = document.querySelectorAll('.tracker-link');
  const sections = [];

  trackerLinks.forEach(link => {
    const id = link.getAttribute('href').substring(1);
    const section = document.getElementById(id);
    if (section) sections.push({ link, section });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`.tracker-link[href="#${entry.target.id}"]`);
      if (entry.isIntersecting) {
        // Remove active from all links
        trackerLinks.forEach(l => l.classList.remove('active'));
        // Add active to current link
        if (link) link.classList.add('active');
      }
    });
  }, {
    rootMargin: '0px 0px -60% 0px',  // activates when section is in the top 40% of viewport
    threshold: 0
  });

  sections.forEach(({ section }) => observer.observe(section));

  // Fallback for smooth scroll on click (preserving the existing page-tracker behaviour)
  trackerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


// Program tab switching (in-page)
document.querySelectorAll('.prog-tab').forEach(tab => {
  tab.addEventListener('click', function(e) {
    document.querySelectorAll('.prog-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    // Show/hide content sections based on data-program attribute
    const program = this.getAttribute('data-program');
    document.querySelectorAll('[data-program-content]').forEach(el => {
      el.style.display = el.getAttribute('data-program-content') === program ? 'block' : 'none';
    });
  });
});


// Inject Google Analytics dynamically
 document.addEventListener('DOMContentLoaded', function() {
  // Select all sidebar section titles
  const sectionTitles = document.querySelectorAll('.sidebar-section .sidebar-title');
  
  sectionTitles.forEach(title => {
    // Find the associated items container (next sibling or inside section)
    const section = title.closest('.sidebar-section');
    const itemsContainer = section.querySelector('.sidebar-items');
    
    // If items container exists, set up toggle
    if (itemsContainer) {
      // Initially, if title has class 'active', expand; otherwise collapse
      if (title.classList.contains('active')) {
        itemsContainer.classList.add('open');
        title.classList.add('open');
      } else {
        itemsContainer.classList.remove('open');
        title.classList.remove('open');
      }
      
      title.addEventListener('click', function(e) {
        e.preventDefault();
        // Toggle open class on items container
        itemsContainer.classList.toggle('open');
        // Toggle open class on title (for chevron rotation)
        title.classList.toggle('open');
        // Optional: keep 'active' class for styling
        title.classList.toggle('active', itemsContainer.classList.contains('open'));
      });
    }
  });
});



 if (typeof copyCode !== 'function') {
      window.copyCode = function(btn) {
        const code = btn.closest('.code-block')?.querySelector('code');
        if (code) {
          navigator.clipboard.writeText(code.textContent).then(() => {
            const icon = btn.querySelector('i');
            if (icon) { icon.classList.replace('fa-copy','fa-check'); setTimeout(() => icon.classList.replace('fa-check','fa-copy'), 2000); }
          });
        }
      };
    }

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const tabGroup = this.closest('.tab-container');
        tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        tabGroup.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        const target = document.getElementById(this.dataset.tab);
        if (target) target.classList.add('active');
      });
    });

    // CPU unit detail
    document.querySelectorAll('#cpuDiagram .cpu-unit').forEach(unit => {
      unit.addEventListener('click', function() {
        const detail = document.getElementById('cpuDetail');
        detail.textContent = this.dataset.detail;
        detail.style.animation = 'none';
        detail.offsetHeight;
        detail.style.animation = 'fadeSlide 0.3s ease';
      });
    });

    // Memory pyramid live info
    const memInfo = document.createElement('div');
    memInfo.id = 'memInfo';
    memInfo.style.cssText = 'text-align:center;margin-top:8px;font-weight:500;color:var(--primary);';
    document.querySelector('#ram-tab .infocard')?.appendChild(memInfo);
    document.querySelectorAll('.mem-level').forEach(level => {
      level.addEventListener('mouseenter', () => {
        memInfo.textContent = `Speed: ${level.dataset.speed}, Size: ${level.dataset.size}`;
      });
      level.addEventListener('mouseleave', () => {
        memInfo.textContent = 'Hover over a level to see details';
      });
    });



        fetch('/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));