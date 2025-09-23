const blogArticlesData = {
  articles: [
    {
      id: "guide-to-use-toomoobil",
      title: "Guide d'utilisation de l'application Toomoobil",
      excerpt:
        "Comment utiliser notre application pour louer une voiture au Maroc.",
      content: `
      <p>Notre application vous permet de réserver une voiture en quelques étapes simples, sans même créer de compte.</p>

      <p>Pour commencer, rendez-vous sur l’<a href="https://apps.apple.com/us/app/toomoobil/id6742456650" target="_blank" rel="noopener noreferrer">App Store</a> ou le <a href="https://play.google.com/store/apps/details?id=ma.app.toomoobil" target="_blank" rel="noopener noreferrer">Play Store</a> et téléchargez l’application Toomoobil.</p>

      <h5>Ouvrez l’application</h5>
      <p>Dès l’ouverture, vous verrez la liste complète des voitures disponibles.</p>

      <h5>Filtrez selon vos besoins</h5>
      <p>Utilisez les filtres pour choisir la ville, le type de voiture, ou les options souhaitées (automatique, climatisation, etc.).</p>

      <h5>Réservez facilement</h5>
      <p>Sélectionnez la voiture qui vous convient, entrez simplement votre nom et votre numéro de téléphone. Aucun compte requis.</p>

      <h5>Confirmation rapide</h5>
      <p>Une fois la demande envoyée, notre équipe vous contacte rapidement pour finaliser la réservation.</p>

      <p>C’est rapide, pratique, et sans complications !</p>
    `,
      category: "guides",
      date: "2025-07-11",
      author: "Équipe Toomoobil",
      readTime: "2 min",
    },
    {
      id: "trouver-meilleur-prix-sans-intermediaires",
      title: "Trouvez le meilleur prix sans intermédiaires avec Toomoobil",
      excerpt:
        "Économisez du temps et de l'argent : trouvez la meilleure offre de location de voiture sans passer par des intermédiaires.",
      content: `
        <p>Fini les longues recherches et les appels sans fin à différents loueurs. Grâce à Toomoobil, vous trouvez en quelques secondes les meilleures offres de location de voiture au Maroc, sans passer par des intermédiaires.</p>

        <h5>Comparez automatiquement</h5>
        <p>Notre application compare en temps réel les tarifs de dizaines de partenaires locaux pour vous proposer les meilleures offres selon vos critères.</p>

        <h5>Pas de commissions cachées</h5>
        <p>En réservant via Toomoobil, vous évitez les frais supplémentaires souvent imposés par les intermédiaires ou les plateformes internationales. Vous payez le prix juste, directement proposé par le loueur.</p>

        <h5>Laissez-nous faire le travail</h5>
        <p>Vous n’avez rien à négocier ou à organiser. Sélectionnez simplement votre véhicule, entrez vos informations, et notre équipe se charge de tout. Nous contactons le loueur, vérifions la disponibilité, et vous confirmons la réservation.</p>

        <h5>Gagnez du temps et de l’énergie</h5>
        <p>Que vous soyez à Casablanca, Marrakech, Agadir ou ailleurs, notre réseau local vous permet de gagner du temps, sans compromis sur le prix ou la qualité.</p>

        <p>Avec Toomoobil, vous louez plus malin, sans stress ni surcoût.</p>
        <p>Rendez-vous sur l’<a href="https://apps.apple.com/us/app/toomoobil/id6742456650" target="_blank" rel="noopener noreferrer">App Store</a> ou le <a href="https://play.google.com/store/apps/details?id=ma.app.toomoobil" target="_blank" rel="noopener noreferrer">Play Store</a> et téléchargez l’application Toomoobil.</p>
        <p>👉 Suivez-nous sur Instagram pour des astuces, des offres exclusives et plus encore : <a href="https://www.instagram.com/toomoobil.ma" target="_blank" rel="noopener noreferrer">@toomoobil.ma</a></p>
      `,
      category: "conseils",
      date: "2025-07-12",
      author: "Équipe Toomoobil",
      readTime: "2 min",
    },
  ],
};


//====== Blog Script ======


      // Article functionality
      let allArticles = [];
      let currentArticle = null;

      // Get article ID from URL
      function getArticleId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("id");
      }

      // Load articles from JSON
      async function loadArticles() {
        try {
          allArticles = blogArticlesData.articles;

          const articleId = getArticleId();
          if (articleId) {
            displayArticle(articleId);
          } else {
            showError();
          }
        } catch (error) {
          console.error("Error loading articles:", error);
          showError();
        }
      }

      // Display specific article
      function displayArticle(articleId) {
        currentArticle = allArticles.find(
          (article) => article.id === articleId
        );

        if (!currentArticle) {
          showError();
          return;
        }

        // Update page title and meta
        document.title = currentArticle.title + " - Toomoobil Blog";
        document.getElementById("article-title").textContent =
          currentArticle.title + " - Toomoobil Blog";
        document
          .getElementById("article-description")
          .setAttribute("content", currentArticle.excerpt);

        // Update hero section
        document.getElementById("hero-category").textContent = getCategoryName(
          currentArticle.category
        );
        document.getElementById("hero-date").textContent = formatDate(
          currentArticle.date
        );
        document.getElementById("hero-author").textContent =
          currentArticle.author;
        document.getElementById("hero-read-time").textContent =
          currentArticle.readTime;
        document.getElementById("hero-title").textContent =
          currentArticle.title;
        document.getElementById("hero-excerpt").textContent =
          currentArticle.excerpt;

        // Update breadcrumb
        document.getElementById("breadcrumb-title").textContent =
          currentArticle.title;

        // Update article content
        document.getElementById("article-body").innerHTML =
          formatArticleContent(currentArticle.content);

        // Show article content
        hideLoading();
        document.getElementById("article-content").style.display = "block";

        // Load related articles
        loadRelatedArticles();
      }

      // Format article content (convert line breaks to HTML)
      function formatArticleContent(content) {
        return content
          .split("\n\n")
          .map((paragraph) => {
            if (paragraph.trim() === "") return "";

            // Check if it's a heading (starts with #)
            if (paragraph.startsWith("# ")) {
              return `<h2>${paragraph.substring(2)}</h2>`;
            }

            // Check if it's a subheading (starts with ##)
            if (paragraph.startsWith("## ")) {
              return `<h3>${paragraph.substring(3)}</h3>`;
            }

            // Check if it's a list (contains bullet points)
            if (paragraph.includes("•") || paragraph.includes("✓")) {
              const items = paragraph.split("\n").filter((line) => line.trim());
              const listItems = items
                .map((item) => `<li>${item.replace(/^[•✓]\s*/, "")}</li>`)
                .join("");
              return `<ul>${listItems}</ul>`;
            }

            // Regular paragraph
            return `<p>${paragraph.replace(/\n/g, "<br>")}</p>`;
          })
          .join("");
      }

      // Load related articles
      function loadRelatedArticles() {
        const relatedArticles = allArticles
          .filter(
            (article) =>
              article.id !== currentArticle.id &&
              article.category === currentArticle.category
          )
          .slice(0, 3);

        if (relatedArticles.length > 0) {
          const relatedContainer = document.getElementById("related-articles");
          relatedContainer.innerHTML = relatedArticles
            .map(
              (article) => `
            <div class="col-lg-4 col-md-6 mb-30">
              <div class="related-card">
                <h5>${article.title}</h5>
                <p>${article.excerpt}</p>
                <a href="article.html?id=${article.id}" class="read-more">
                  Lire l'article <i class="lni lni-arrow-right"></i>
                </a>
              </div>
            </div>
          `
            )
            .join("");

          document.getElementById("related-section").style.display = "block";
        }
      }

      // Helper functions
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
        document.getElementById("loading").style.display = "none";
      }

      function showError() {
        hideLoading();
        document.getElementById("error").style.display = "block";
      }

      // Initialize
      document.addEventListener("DOMContentLoaded", function () {
        loadArticles();
      });