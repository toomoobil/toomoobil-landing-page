// Initialize WOW animations
      new WOW().init();


$(function () {

    "use strict";

    //===== Prealoder

    $(window).on('load', function (event) {
        $('.preloader').delay(500).fadeOut(500);
    });



    //===== Sticky

    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 20) {
            $(".navbar-area").removeClass("sticky");
        } else {
            $(".navbar-area").addClass("sticky");
        }
    });



    //===== Section Menu Active

    var scrollLink = $('.page-scroll');
    // Active link switching
    $(window).scroll(function () {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function () {

            var sectionOffset = $(this.hash).offset().top - 73;

            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        });
    });


    //===== close navbar-collapse when a  clicked

    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    $(".navbar-toggler").on('click', function () {
        $(this).toggleClass("active");
    });

    $(".navbar-nav a").on('click', function () {
        $(".navbar-toggler").removeClass('active');
    });




    //===== Back to top

    // Show or hide the sticky footer button
    $(window).on('scroll', function (event) {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200)
        } else {
            $('.back-to-top').fadeOut(200)
        }
    });


    //Animate the scroll to yop
    $('.back-to-top').on('click', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });


    //===== Svg

    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });


    //=====  WOW active

    new WOW().init();





});

//====== Contact Form Submission Script ======

document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const form = e.target;
        const data = new FormData(form);

        fetch('https://formspree.io/f/xeokbbol', {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        }).then(response => {
          if (response.ok) {
            document.getElementById('form-status').textContent = 'Merci ! Votre message a été envoyé.';
            document.getElementById('form-status').classList.remove('d-none', 'text-danger');
            document.getElementById('form-status').classList.add('text-success');
            form.reset();
          } else {
            return response.json().then(data => {
              throw new Error(data.error || 'Une erreur est survenue.');
            });
          }
        }).catch(error => {
          document.getElementById('form-status').textContent = error.message;
          document.getElementById('form-status').classList.remove('d-none', 'text-success');
          document.getElementById('form-status').classList.add('text-danger');
        });
});

// document
//         .getElementById("contact-form")
//         .addEventListener("submit", function (e) {
//           e.preventDefault();

//           const form = e.target;
//           const data = new FormData(form);

//           fetch("https://formspree.io/f/xeokbbol", {
//             method: "POST",
//             body: data,
//             headers: {
//               Accept: "application/json",
//             },
//           })
//             .then((response) => {
//               if (response.ok) {
//                 document.getElementById("form-status").textContent =
//                   "Merci ! Votre message a été envoyé.";
//                 document
//                   .getElementById("form-status")
//                   .classList.remove("d-none", "text-danger");
//                 document
//                   .getElementById("form-status")
//                   .classList.add("text-success");
//                 form.reset();
//               } else {
//                 return response.json().then((data) => {
//                   throw new Error(data.error || "Une erreur est survenue.");
//                 });
//               }
//             })
//             .catch((error) => {
//               document.getElementById("form-status").textContent =
//                 error.message;
//               document
//                 .getElementById("form-status")
//                 .classList.remove("d-none", "text-success");
//               document
//                 .getElementById("form-status")
//                 .classList.add("text-danger");
//             });
//         });


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