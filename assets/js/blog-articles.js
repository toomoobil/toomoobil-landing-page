//====== Blog Script ======

// Blog functionality
let allArticles = [];
let currentFilter = "all";

// Load articles from JSON
async function loadArticles() {
  try {
    const response = await fetch("assets/data/articles.json");
    const data = await response.json();
    allArticles = data.articles;

    displayArticles(allArticles);
    hideLoading();
  } catch (error) {
    console.error("Error loading articles:", error);
    showNoArticles();
    hideLoading();
  }
}

// Display articles
function displayArticles(articles) {
  const container = document.getElementById("blog-container");
  const noArticlesDiv = document.getElementById("no-articles");

  if (!articles || articles.length === 0) {
    container.style.display = "none";
    noArticlesDiv.style.display = "block";
    return;
  }

  container.style.display = "flex";
  noArticlesDiv.style.display = "none";

  container.innerHTML = articles
    .map(
      (article) => `
      <div class="col-lg-4 col-md-6" style="margin-bottom: 30px">
        <article class="blog-card wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.2s">
          <div class="blog-image">
            ${
              article.image
                ? `<img src="${article.image}" alt="${article.title}" loading="lazy" width="100%" height="auto" />`
                : `<i class="lni lni-${getIconForCategory(article.category)}"></i>`
            }
          </div>
          <div class="blog-content">
            <div class="blog-meta">
              <span class="blog-category">${getCategoryName(article.category)}</span>
              <span><i class="lni lni-calendar"></i> ${formatDate(article.date)}</span>
            </div>
            <h3 class="blog-title">${article.title}</h3>
            <p class="blog-excerpt">${article.excerpt}</p>
            <a href="article.html?id=${article.id}" class="read-more">
              Lire la suite <i class="lni lni-arrow-right"></i>
            </a>
          </div>
        </article>
      </div>
    `
    )
    .join("");
}

// Filter articles
function filterArticles(category) {
  currentFilter = category;

  // Update active filter button
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`[data-category="${category}"]`)
    .classList.add("active");

  // Filter and display articles
  const filteredArticles =
    category === "all"
      ? allArticles
      : allArticles.filter((article) => article.category === category);

  displayArticles(filteredArticles);
}

// Helper functions
function getIconForCategory(category) {
  const icons = {
    conseils: "bulb",
    actualites: "world",
    guides: "book",
  };
  return icons[category] || "file";
}

function getCategoryName(category) {
  const names = {
    conseils: "Conseils",
    actualites: "Actualités",
    guides: "Guides",
  };
  return names[category] || category;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function hideLoading() {
  const loader = document.getElementById("loading");
  if (loader) loader.style.display = "none";
}

function showNoArticles() {
  const noArticlesDiv = document.getElementById("no-articles");
  if (noArticlesDiv) noArticlesDiv.style.display = "block";
}

function openArticle(articleId) {
  window.location.href = `article.html?id=${articleId}`;
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Load articles
  loadArticles();

  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      filterArticles(category);
    });
  });
});