const articles = [
  {id:1,category:"World",title:"Understanding the big stories shaping our changing world",summary:"A clear, accessible look at the global developments, decisions and ideas making headlines today.",icon:"🌐",art:"art-world",date:"DAILY EXPLAINER",body:"International affairs can feel complicated, but many global developments are connected by a few important themes: cooperation between countries, trade, climate, technology and security. When reading a global headline, look beyond the announcement. Ask which countries and communities are affected, what led to the decision, and what may happen next. This explainer is a starting point for informed discussion, not a live news report."},
  {id:2,category:"National",title:"How public policy decisions affect everyday life",summary:"Explore how public institutions, policies and civic participation shape communities.",icon:"🇮🇳",art:"art-national",date:"CIVICS & GOVERNANCE",body:"Public policy is the set of decisions and actions through which governments address shared concerns. Policies can influence education, transport, health services, the environment and the economy. To understand a policy, identify the problem it aims to solve, the institution responsible, the people affected and how outcomes will be measured. Always consult official government releases and credible reporting for current details."},
  {id:3,category:"Technology",title:"Innovation and the technologies to watch",summary:"A beginner-friendly guide to emerging technology and its impact on society.",icon:"🤖",art:"art-tech",date:"TECH EXPLAINER",body:"Artificial intelligence, clean energy, cybersecurity and advanced communications are changing how people work and live. New technology brings opportunities as well as questions about privacy, access, safety and accountability. A useful way to evaluate a technology story is to separate what is already available from what is still experimental, and to look for evidence beyond promotional claims."},
  {id:4,category:"Business",title:"Making sense of markets and the economy",summary:"Understand the everyday terms behind markets, inflation, jobs and economic growth.",icon:"📊",art:"art-business",date:"ECONOMY BASICS",body:"Economic headlines often mention inflation, interest rates, growth and employment. Inflation describes a broad rise in prices over time, while interest rates influence the cost of borrowing and saving. These indicators interact, but no single number tells the whole story. Check the reporting period, the source of the data and whether figures are provisional or revised."},
  {id:5,category:"Sports",title:"Sport, teamwork and the power of global events",summary:"Why major sporting events matter beyond the final score.",icon:"🏆",art:"art-sports",date:"SPORTS & SOCIETY",body:"Sport connects communities and countries through competition, teamwork and shared experiences. Major events can also raise questions about infrastructure, public investment, inclusion and sustainability. When following a tournament, verify schedules and results with the official event organiser because fixtures and standings can change."},
  {id:6,category:"Education",title:"Building a daily habit of learning current affairs",summary:"Simple ways to improve awareness, note-taking and critical thinking.",icon:"📚",art:"art-education",date:"STUDENT CORNER",body:"A useful current-affairs routine does not need to take hours. Choose a few reliable sources, read across different topics, and write a short note explaining what happened, why it matters and what remains uncertain. Check dates, compare coverage and distinguish reporting from opinion. Revisiting your notes each week helps turn scattered headlines into lasting understanding."},
  {id:7,category:"National",title:"The role of citizens in a healthy democracy",summary:"A quick guide to civic responsibility, public information and participation.",icon:"🏛️",art:"art-national",date:"CIVICS & GOVERNANCE",body:"Democratic participation includes more than voting. Citizens can stay informed, ask questions, engage with local institutions, follow public consultations and evaluate policy outcomes. Reliable information matters: look for primary documents where possible and compare credible sources before sharing claims."},
  {id:8,category:"World",title:"Climate cooperation: why international agreements matter",summary:"Understanding the shared challenges behind climate diplomacy.",icon:"🌱",art:"art-world",date:"ENVIRONMENT",body:"Climate change crosses borders, which makes international cooperation important. Countries may work together on emissions, adaptation, finance and technology. Agreements set shared goals, but implementation depends on national plans, investment and transparent progress reporting. For the latest figures, use recognised scientific bodies and official climate reports."},
  {id:9,category:"Technology",title:"Cybersecurity basics everyone should know",summary:"Practical digital safety habits for students and everyday internet users.",icon:"🔐",art:"art-tech",date:"DIGITAL LIFE",body:"Good cybersecurity begins with unique passwords, multi-factor authentication, software updates and caution around unexpected links. Be careful with requests for one-time passwords or account recovery details. Organisations should also limit access to sensitive systems and maintain tested backups. Security is an ongoing habit rather than a one-time setting."}
];

const grid = document.getElementById("news-grid");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("search-input");
let activeCategory = "All";

function renderStories() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = articles.filter(article => {
    const categoryMatch = activeCategory === "All" || article.category === activeCategory;
    const textMatch = `${article.title} ${article.summary} ${article.category}`.toLowerCase().includes(query);
    return categoryMatch && textMatch;
  });
  grid.innerHTML = filtered.map(article => `
    <article class="news-card">
      <div class="card-art ${article.art}">${article.icon}<span>${article.category.toUpperCase()}</span></div>
      <div class="card-body">
        <div class="card-meta">${article.date} · 4 MIN READ</div>
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
        <div class="card-footer"><button data-article="${article.id}">READ MORE ↗</button><span>DAILYPULSE</span></div>
      </div>
    </article>`).join("");
  emptyState.hidden = filtered.length !== 0;
}

function openArticle(id) {
  const article = articles.find(item => item.id === Number(id));
  if (!article) return;
  document.getElementById("modal-category").textContent = article.category.toUpperCase();
  document.getElementById("modal-title").textContent = article.title;
  document.getElementById("modal-meta").textContent = `${article.date} · 4 MIN READ`;
  document.getElementById("modal-body").textContent = article.body;
  const modal = document.getElementById("article-modal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}
function closeArticle() {
  const modal = document.getElementById("article-modal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

document.addEventListener("click", event => {
  const articleButton = event.target.closest("[data-article]");
  if (articleButton) openArticle(articleButton.dataset.article);
  if (event.target.closest("[data-close-modal]")) closeArticle();
});
document.addEventListener("keydown", event => { if (event.key === "Escape") closeArticle(); });

document.getElementById("category-filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
  renderStories();
});
document.getElementById("search-toggle").addEventListener("click", () => {
  document.getElementById("search-wrap").classList.toggle("open");
  if (document.getElementById("search-wrap").classList.contains("open")) searchInput.focus();
});
searchInput.addEventListener("input", renderStories);
document.getElementById("search-clear").addEventListener("click", () => { searchInput.value = ""; renderStories(); });
document.getElementById("menu-toggle").addEventListener("click", () => document.getElementById("mobile-nav").classList.toggle("open"));
document.querySelectorAll(".mobile-nav a").forEach(link => link.addEventListener("click", () => document.getElementById("mobile-nav").classList.remove("open")));
document.getElementById("newsletter-form").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("newsletter-message").textContent = "Thanks for your interest! This demo form does not store or send email addresses.";
  event.target.reset();
});

const now = new Date();
document.getElementById("today-date").textContent = now.toLocaleDateString("en-US", {weekday:"long", month:"long", day:"numeric", year:"numeric"}).toUpperCase();
document.getElementById("year").textContent = now.getFullYear();
document.getElementById("breaking-text").textContent = "Daily briefing: explore national, world, technology, business and sports explainers.";
renderStories();