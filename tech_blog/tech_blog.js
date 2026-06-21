// ---------- BLOG DATA (extended) ----------
let blogPosts = [
  { id:1, title:"Microservices vs Monoliths", description:"Comparing architectural styles, trade-offs, migration strategies and organizational impact.", author:"Sarah Lee", date:"2022-01-05", readTime:"6 min read", views:1520, icon:"fa-cubes", color:"#3b82f6", category:"Architecture", tags:["Microservices","Monolith"] },
  { id:2, title:"Understanding the CAP Theorem", description:"Consistency, Availability, Partition tolerance — deep dive into distributed systems tradeoffs.", author:"Mark Smith", date:"2021-12-20", readTime:"5 min read", views:1890, icon:"fa-chalkboard", color:"#8b5cf6", category:"Distributed Systems", tags:["CAP","Consistency"] },
  { id:3, title:"Choosing the Right Database", description:"SQL vs NoSQL, NewSQL, and database selection for scalability & performance.", author:"Priya Mehta", date:"2023-04-10", readTime:"8 min read", views:2340, icon:"fa-database", color:"#10b981", category:"Databases", tags:["SQL","NoSQL"] },
  { id:4, title:"Scaling with Kubernetes", description:"Container orchestration, auto-scaling, service discovery and production best practices.", author:"James Carter", date:"2023-06-18", readTime:"7 min read", views:2100, icon:"fa-dharmachakra", color:"#06b6d4", category:"DevOps", tags:["K8s","Scaling"] },
  { id:5, title:"API Rate Limiting Strategies", description:"Token bucket, sliding window, and advanced techniques to protect APIs.", author:"Elena Zhang", date:"2022-09-14", readTime:"5 min read", views:1775, icon:"fa-tachometer-alt", color:"#f97316", category:"API Design", tags:["Rate limiting","APIs"] },
  { id:6, title:"Event-Driven Architecture", description:"Decouple services with Kafka vs RabbitMQ, event sourcing and real-world patterns.", author:"David Kim", date:"2023-08-02", readTime:"9 min read", views:1320, icon:"fa-bolt", color:"#eab308", category:"Architecture", tags:["Events","Kafka"] },
  { id:7, title:"How to Design a URL Shortener", description:"Scalable key generation, caching, database sharding and analytics.", author:"Aisha Wilson", date:"2023-11-11", readTime:"6 min read", views:1650, icon:"fa-link", color:"#ec489a", category:"System Design", tags:["Shortener","Caching"] },
  { id:8, title:"GraphQL vs REST: Deep Dive", description:"Performance, over-fetching, caching strategies and when to use each.", author:"Tom Richards", date:"2024-02-10", readTime:"7 min read", views:2200, icon:"fa-project-diagram", color:"#14b8a6", category:"API Design", tags:["GraphQL","REST"] }
];

const featuredPost = {
  title: "Amazon lost 6.3M orders due to AI‑generated code failure",
  description: "When AI‑generated code passed every test but failed in production – $72M revenue loss, 6.3 million orders lost, and a deep dive into silent error swallowing, naive retries, and missing idempotency.",
  date: "2025-05-25",
  readTime: "8 min read",
  icon: "fa-amazon",
  badge: "🔥 PRODUCTION INCIDENT",
  link: "amazon_lost_6.3M.html"
};

// Helper functions
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
}
function escapeHtml(str) {
  if(!str) return '';
  return str.replace(/[&<>]/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[m] || m));
}

let currentSort = "date";
let searchQuery = "";

function filterAndSortPosts() {
  let filtered = blogPosts.filter(p => p.title.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery));
  if(currentSort === "views") return [...filtered].sort((a,b) => b.views - a.views);
  return [...filtered].sort((a,b) => new Date(b.date) - new Date(a.date));
}

// ---------- MAIN CONTENT RENDERING ----------
function renderFeatured() {
  const container = document.getElementById('featuredPostContainer');
  if(!container) return;
  container.innerHTML = `
    <div class="featured-card">
      <div class="featured-img"><i class="fab ${featuredPost.icon} fa-4x"></i></div>
      <div class="featured-content">
        <span class="featured-badge"><i class="fas fa-star"></i> ${featuredPost.badge}</span>
        <h2>${featuredPost.title}</h2>
        <p>${featuredPost.description}</p>
        <div class="featured-meta"><span><i class="fas fa-user-pen"></i> ${featuredPost.author}</span><span><i class="far fa-calendar-alt"></i> ${formatDate(featuredPost.date)}</span><span><i class="far fa-clock"></i> ${featuredPost.readTime}</span></div>
        <a href="${featuredPost.link}" class="read-more">Read full story <i class="fas fa-arrow-right"></i></a>
      </div>
    </div>`;
}

function renderBlogCards() {
  const container = document.getElementById('blogCardsContainer');
  const posts = filterAndSortPosts();
  if(posts.length === 0) { container.innerHTML = '<p>No matching articles found. Try another keyword.</p>'; return; }
  let html = '';
  posts.forEach(post => {
    const isTrending = post.views > 1800;
    html += `<div class="blog-card">
      ${isTrending ? '<div class="trending-badge"><i class="fas fa-chart-line"></i> Trending</div>' : ''}
      <div class="card-img" style="background: linear-gradient(145deg, #f1f5f9, #e2e8f0);"><i class="fas ${post.icon}" style="font-size:2.8rem; color:${post.color};"></i></div>
      <div class="card-content">
        <h3>${escapeHtml(post.title)}</h3>
        <p class="card-description">${escapeHtml(post.description.substring(0,100))}${post.description.length>100?'...':''}</p>
        <div class="card-meta"><span><i class="fas fa-user"></i> ${escapeHtml(post.author)}</span><span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span></div>
        <div class="card-meta" style="margin-top:8px;"><span><i class="far fa-clock"></i> ${post.readTime}</span><span><i class="fas fa-eye"></i> ${post.views} views</span></div>
      </div>
    </div>`;
  });
  container.innerHTML = html;
}

// ---------- SIDEBAR RENDERING (tech-blog- prefixed) ----------
function renderPopularPosts() {
  const container = document.getElementById('tech-blog-popularPostsList');
  if (!container) return;
  const sorted = [...blogPosts].sort((a,b)=>b.views - a.views).slice(0,4);
  container.innerHTML = sorted.map(p => `<li><a href="#"><i class="fas fa-chart-line"></i> ${escapeHtml(p.title)} <span style="font-size:0.7rem;">(${p.views} views)</span></a></li>`).join('');
}

function renderRelatedPosts() {
  const container = document.getElementById('tech-blog-relatedPostsList');
  if (!container) return;
  const shuffled = [...blogPosts].sort(()=>0.5 - Math.random()).slice(0,3);
  container.innerHTML = shuffled.map(p => `<li><a href="#"><i class="fas fa-arrow-right"></i> ${escapeHtml(p.title)}</a></li>`).join('');
}

function renderCategories() {
  const container = document.getElementById('tech-blog-categoryList');
  if (!container) return;
  const catMap = new Map();
  blogPosts.forEach(p => { catMap.set(p.category, (catMap.get(p.category)||0)+1); });
  container.innerHTML = Array.from(catMap.entries()).map(([cat,count]) => `<li><a href="#">${cat}<span class="category-count">${count}</span></a></li>`).join('');
}

function renderTagCloud() {
  const container = document.getElementById('tech-blog-tagCloud');
  if (!container) return;
  const tagFreq = new Map();
  blogPosts.forEach(p => { p.tags.forEach(t => { tagFreq.set(t, (tagFreq.get(t)||0)+1); }); });
  container.innerHTML = Array.from(tagFreq.entries()).map(([tag]) => `<span class="tag">${tag}</span>`).join('');
}

function refreshAll() {
  renderBlogCards();
  renderPopularPosts();
  renderRelatedPosts();
  renderCategories();
  renderTagCloud();
}

// ---------- SHARE & NEWSLETTER ----------
function attachShareAndNewsletter() {
  document.querySelectorAll('.share-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
      const platform = icon.dataset.platform;
      if(platform === 'linkedin') alert('🔗 Share on LinkedIn (integration ready)');
      else if(platform === 'twitter') alert('🐦 Share on X');
      else if(platform === 'heart') alert('❤️ Thanks for appreciating!');
      else if(platform === 'reddit') alert('📢 Share on Reddit');
      else alert('Share this knowledge!');
    });
  });

  const subscribeBtn = document.getElementById('tech-blog-subscribeBtn');
  const newsEmail = document.getElementById('tech-blog-newsEmail');
  if (subscribeBtn && newsEmail) {
    subscribeBtn.addEventListener('click', () => {
      const email = newsEmail.value.trim();
      if(email) {
        alert(`📧 Subscribed with ${email} — weekly insights on the way!`);
        newsEmail.value = '';
      } else {
        alert('Please enter a valid email.');
      }
    });
  }
}

// ---------- DARK MODE TOGGLE ----------
const themeToggle = document.getElementById('themeToggle');
if(localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// ---------- SEARCH & SORT ----------
const searchInput = document.getElementById('searchInput');
searchInput?.addEventListener('input', (e) => { searchQuery = e.target.value.toLowerCase(); refreshAll(); });

document.querySelectorAll('.sort-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSort = btn.dataset.sort;
    refreshAll();
  });
});

// ---------- BACK TO TOP + PROGRESS BAR ----------
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('progressBar').style.width = scrolled + '%';
  const backBtn = document.getElementById('backToTop');
  if(winScroll > 300) backBtn.classList.add('show');
  else backBtn.classList.remove('show');
});
document.getElementById('backToTop')?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

// ---------- INITIAL MAIN CONTENT LOAD ----------
renderFeatured();
renderBlogCards();

// ---------- LOAD SIDEBAR DYNAMICALLY ----------
function loadSidebarAndInit() {
  const container = document.getElementById('tech-blog-sidebar-container');
  if (!container) return;

  fetch('tech_blog_sidebar.html')
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;
      renderCategories();
      renderPopularPosts();
      renderRelatedPosts();
      renderTagCloud();
      attachShareAndNewsletter();
    })
    .catch(err => console.error('Failed to load tech blog sidebar:', err));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSidebarAndInit);
} else {
  loadSidebarAndInit();
}

// ---------- EXTERNAL INTERFACE ----------
window.addNewBlog = (blog) => { if(blog.title && blog.author) { blogPosts.push({...blog, id:blogPosts.length+1}); refreshAll(); } };