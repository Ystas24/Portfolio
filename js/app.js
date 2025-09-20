// Theme toggle
const themeBtn = document.getElementById('theme');
if (themeBtn){
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  themeBtn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'light' ? '' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    if (next) localStorage.setItem('theme', next); else localStorage.removeItem('theme');
  });
}

// Footer year
const y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

// Nav highlighting (simple)
(function highlightActive(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
})();

// Projects rendering (only on projects.html)
function renderProjects(filter = ""){
  if (!window.PROJECTS) return;
  const root = document.getElementById("projectList");
  if (!root) return;
  root.innerHTML = "";
  const q = filter.trim().toLowerCase();
  window.PROJECTS
    .filter(p => !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.tags.join(" ").toLowerCase().includes(q))
    .forEach(p => {
      const el = document.createElement("article");
      el.className = "card project";
      el.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <div style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap">
          ${p.links?.code ? `<a class="btn" href="${p.links.code}" target="_blank" rel="noopener">💻 Код</a>` : ""}
          ${p.links?.demo ? `<a class="btn" href="${p.links.demo}" target="_blank" rel="noopener">🧪 Демка</a>` : ""}
        </div>
      `;
      root.appendChild(el);
    });
  if (!root.children.length) {
    const empty = document.createElement('div');
    empty.className = 'card';
    empty.textContent = 'Нічого не знайдено. Спробуй інші ключові слова.';
    root.appendChild(empty);
  }
}

// Attach search on projects page
const searchInput = document.getElementById('q');
if (searchInput){
  searchInput.addEventListener('input', (e) => renderProjects(e.target.value));
  renderProjects();
}

// Copy email
const copyBtn = document.getElementById('copyEmail');
if (copyBtn){
  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const emailLink = document.querySelector('#contact a[href^="mailto:"]');
    if (!emailLink) return;
    const email = emailLink.textContent;
    navigator.clipboard.writeText(email).then(() => {
      const btn = e.currentTarget; btn.textContent = 'Скопійовано!'; setTimeout(()=>btn.textContent='📧 Скопіювати email', 1200);
    });
  });
}
