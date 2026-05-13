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


// Coaching Banner Loader


// Coaching Banner – loads into a placeholder div on Python lesson pages
(function() {
  const placeholder = document.getElementById('coaching-banner-placeholder');
  if (!placeholder) return; // no placeholder = no banner on this page

  fetch('/snippets/coaching-banner.html')
    .then(function(response) {
      if (!response.ok) throw new Error('Snippet not found (HTTP ' + response.status + ')');
      return response.text();
    })
    .then(function(html) {
      placeholder.innerHTML = html;
    })
    .catch(function(err) {
      console.warn('Coaching banner not loaded:', err.message);
    });
})();


fetch('/header_bar.html')  // absolute path from root
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-container').innerHTML = html;

    // Highlight current page link
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
      if (currentPath.includes(link.getAttribute('href').split('/').pop())) {
        link.classList.add('active');
      }
    });

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener('click', () => {
        const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
        mobileBtn.setAttribute('aria-expanded', !expanded);
        navLinks.classList.toggle('active');
      });
    }

    // Sidebar toggle – keep original behavior (toggle sidebar-collapsed on main-container)
    const sidebarBtn = document.getElementById('sidebarToggleBtn');
    if (sidebarBtn) {
      const mainContainer = document.querySelector('.main-container');
      sidebarBtn.addEventListener('click', () => {
        mainContainer.classList.toggle('sidebar-collapsed');
      });
    }
  })
  .catch(err => console.error('Header load error:', err));

