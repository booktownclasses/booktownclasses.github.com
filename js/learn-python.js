// ================================
//  Copy Code Button
// ================================
function copyCode(button) {
  const pre = button.closest('.code-block').querySelector('pre');
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
  });
}

// ================================
//  Mobile Menu Toggle (fixed)
// ================================
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('show');                     // ✅ matches CSS
  this.setAttribute('aria-expanded', navLinks.classList.contains('show'));
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('show');
    document.getElementById('mobileMenuBtn').setAttribute('aria-expanded', 'false');
  });
});

// ================================
//  Sidebar Toggle (hamburger button)
// ================================
document.getElementById('sidebarToggleBtn')?.addEventListener('click', function() {
  document.querySelector('.main-container').classList.toggle('sidebar-collapsed');
});

// ================================
//  Sidebar Section Collapse
// ================================
function initSidebarCollapse() {
  document.querySelectorAll('.sidebar-section').forEach(section => {
    const titleDiv = section.querySelector('.sidebar-title');
    if (!titleDiv) return;
    if (titleDiv.getAttribute('data-collapsible') === 'true') return;

    // Add toggle icon if missing
    if (!titleDiv.querySelector('.toggle-icon')) {
      const chevron = document.createElement('i');
      chevron.className = 'fas fa-chevron-down toggle-icon';
      chevron.setAttribute('aria-hidden', 'true');
      titleDiv.appendChild(chevron);
    }

    // Set initial state (expanded by default)
    if (!section.classList.contains('collapsed')) {
      titleDiv.setAttribute('aria-expanded', 'true');
    } else {
      titleDiv.setAttribute('aria-expanded', 'false');
    }

    titleDiv.addEventListener('click', (e) => {
      e.stopPropagation();
      section.classList.toggle('collapsed');
      titleDiv.setAttribute('aria-expanded', !section.classList.contains('collapsed'));
    });

    titleDiv.setAttribute('data-collapsible', 'true');
    titleDiv.style.cursor = 'pointer';
  });
}

// ================================
//  Scroll Spy for Page Tracker
// ================================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
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
  if (heading.id) observer.observe(heading);
});

const practiceCard = document.getElementById('practice-problems');
if (practiceCard) observer.observe(practiceCard);

const unsolvedCard = document.getElementById('unsolved-exercises');
if (unsolvedCard) observer.observe(unsolvedCard);

// ================================
//  Dynamic Sidebar Loader
// ================================
(function() {
  const sidebarContainer = document.getElementById('mainSidebar');
  if (!sidebarContainer) return;

  // Fetch the shared sidebar content
  fetch('sidebar.html')
    .then(response => response.text())
    .then(html => {
      sidebarContainer.innerHTML = html;

      // Determine current page filename
      const currentPage = window.location.pathname.split('/').pop() || 'learn-python-intro.html';

      // Add 'active' class to the correct sidebar link
      const sidebarLinks = sidebarContainer.querySelectorAll('.sidebar-item[href]');
      sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
          link.classList.add('active');
        }
      });

      // Re-initialize sidebar collapse/expand listeners
      if (typeof initSidebarCollapse === 'function') {
        initSidebarCollapse();
      }
    })
    .catch(err => console.error('Sidebar failed to load:', err));
})();

// ================================
//  Tab Interaction (for Computer Fundamentals page)
// ================================
(function() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  if (tabButtons.length === 0) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabGroup = this.parentElement;   // .tab-buttons
      const container = tabGroup.parentElement; // .tab-container

      // Remove active class from all buttons and panels
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

      // Activate clicked button
      this.classList.add('active');

      // Show corresponding panel
      const panelId = this.getAttribute('data-tab');
      const panel = document.getElementById(panelId);
      if (panel) panel.classList.add('active');
    });
  });
})();

// ================================
//  Initialise Everything
// ================================
initSidebarCollapse();


