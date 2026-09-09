"use strict";

/* DOM ELEMENTS */

const productImage = document.querySelector(".product-image img");
const productTitle = document.querySelector(".product-heading h1");
const productRating = document.querySelector(".product-rating");
const productPrice = document.querySelector(".product-price");
const productDescription = document.querySelector(".product-description");
const productTags = document.querySelector(".product-tags");

const reviewsList = document.querySelector('.reviews-list');

/* API */

const API_URL = "https://v2.api.noroff.dev/online-shop";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

/* FETCH PRODUCT */

async function fetchProduct() {
  try {
    const response = await fetch(`${API_URL}/${productId}`);
    const data = await response.json();

    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error("Failed to fetch product");
  }
}

/* RENDER */

function renderProduct(product) {
  /* Product Image */
  productImage.src = product.image.url;
  productImage.alt = product.image.alt;

  /* Product information */
  productTitle.textContent = product.title;
  productPrice.textContent = `${product.price} NOK`;
  productDescription.textContent = product.description;

  /* Product rating */
  renderRating(product.rating);

  /* Product tags */
  productTags.append(product.tags.join(", "));

  /* Render customer reviews */
  renderReviews(product.reviews);
}

function renderRating(rating) {
  const roundedRating = Math.round(rating);

  for (let i = 0; i < roundedRating; i++) {
    const star = document.createElement("i");

    star.classList.add("fa-solid", "fa-star");

    productRating.appendChild(star);
  }

  const ratingNumber = document.createElement("span");

  ratingNumber.classList.add("product-rating-number");
  ratingNumber.textContent = `(${rating})`;

  productRating.appendChild(ratingNumber);
}

function renderReviews(reviews) {
    if (reviews.length === 0) {

        const reviewItem = document.createElement("article");
        reviewItem.classList.add("review-item");

        const reviewIcon = document.createElement("i");
        reviewIcon.classList.add("fa-solid", "fa-comments");
        reviewIcon.setAttribute("aria-hidden", "true");

        reviewItem.appendChild(reviewIcon);

        const reviewMessage = document.createElement("p");
        reviewMessage.textContent = "This product doesn't have any reviews yet.";

        reviewItem.appendChild(reviewMessage);

        reviewsList.appendChild(reviewItem);

        return;
    }


  reviews.forEach((review) => {
    /* Create the article */
    const reviewItem = document.createElement("article");
    reviewItem.classList.add("review-item");

    /* Create the icon */
    const reviewIcon = document.createElement("i");
    reviewIcon.classList.add("review-icon","fa-solid", "fa-comments");
    reviewIcon.setAttribute("aria-hidden", "true");

    reviewItem.appendChild(reviewIcon);

    /* Create the div container */
    const reviewContent = document.createElement('div');
    reviewContent.classList.add("review-content");
    reviewItem.appendChild(reviewContent);

    // Create the Rating
        const reviewRating = document.createElement('div');

        reviewRating.classList.add('rating-review');

        const roundedRating = Math.round(review.rating);

        for (let i = 0; i < roundedRating; i++) {
            const star = document.createElement('i');

            star.classList.add('fa-solid', 'fa-star');

            reviewRating.appendChild(star);
        }

        const ratingNumber = document.createElement('span');

        ratingNumber.classList.add('product-rating-number');
        ratingNumber.textContent = `(${review.rating})`;

        reviewRating.appendChild(ratingNumber);
        reviewContent.appendChild(reviewRating);

        // Create the Comment
        const reviewComment = document.createElement('p');

        reviewComment.classList.add('review');
        reviewComment.textContent = review.description;

        reviewContent.appendChild(reviewComment);

        // Create the Username
        const reviewUser = document.createElement('p');

        reviewUser.classList.add('user-review');
        reviewUser.textContent = review.username;

        reviewContent.appendChild(reviewUser);

        // Add review to the page
        reviewsList.appendChild(reviewItem);
  });
}

/* INIT */

async function init() {
  const product = await fetchProduct();

  renderProduct(product);
}

init();
