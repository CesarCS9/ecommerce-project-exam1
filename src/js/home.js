"use strict";

/* DOM ELEMENTS */

const productGrid = document.querySelector(".product-grid");

const carouselImage = document.querySelector(".carousel-image");
const carouselTitle = document.querySelector(".carousel-title");
const carouselBuyBtn = document.querySelector(".carousel-buy-btn");
const previousButton = document.querySelector(".carousel-button-previous");
const nextButton = document.querySelector(".carousel-button-next");
const carouselProduct = document.querySelector(".carousel-product");

/* API */

const API_URL = "https://v2.api.noroff.dev/online-shop";

/* FETCH PRODUCTS */

// Fetches products from the online shop API
async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error("Failed to fetch products");
  }
}

/* HOT PICKS */

// Returns the 12 highest-rated products
function getTopRatedProducts(products) {
  const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);

  return sortedProducts.slice(0, 12);
}

// Renders the product cards inside the product grid
function renderProducts(products) {
  products.forEach((product) => {
    // Create the main product card
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    // Create the image container
    const productImageContainer = document.createElement("div");
    productImageContainer.classList.add("product-image-container");

    productCard.appendChild(productImageContainer);

    const productImageLink = document.createElement("a");
    productImageLink.classList.add("product-image-link");
    productImageLink.href = `product/index.html?id=${product.id}`;

    // Create the product image
    const productImage = document.createElement("img");
    productImage.classList.add("product-image");
    productImage.src = product.image.url;
    productImage.alt = product.image.alt;
    productImage.loading = "lazy";
    productImage.decoding = "async";

    productImageLink.appendChild(productImage);
    productImageContainer.appendChild(productImageLink);

    // Create the product price
    const productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.textContent = `${product.price} NOK`;

    productImageContainer.appendChild(productPrice);

    // Create the button linking to the product-specific page
    const productButton = document.createElement("a");
    productButton.classList.add("product-buy-btn");
    productButton.textContent = "BUY NOW";
    productButton.href = `product/index.html?id=${product.id}`;

    productImageContainer.appendChild(productButton);

    // Create the product title
    const productTitle = document.createElement("h3");
    productTitle.classList.add("product-title");
    productTitle.textContent = product.title;

    productCard.appendChild(productTitle);

    // Create the rating stars
    const productRating = document.createElement("div");
    productRating.classList.add("product-rating");

    const rating = Math.round(product.rating);

    for (let i = 0; i < rating; i++) {
      const star = document.createElement("i");
      star.classList.add("fa-solid", "fa-star");
      productRating.appendChild(star);
    }

    // Display the exact rating next to the stars
    const ratingNumber = document.createElement("span");
    ratingNumber.classList.add("product-rating-number");
    ratingNumber.textContent = `(${product.rating})`;

    productRating.appendChild(ratingNumber);
    productCard.appendChild(productRating);

    // Add the completed card to the product grid
    productGrid.appendChild(productCard);
  });
}

/* CAROUSEL */

let carouselProducts = [];
let currentIndex = 0;

// Displays the selected product in the carousel
function renderCarouselProduct(product) {
  carouselImage.src = product.image.url;
  carouselImage.alt = product.image.alt;
  carouselTitle.textContent = product.title;
  carouselBuyBtn.textContent = `Buy ${product.price} NOK`;
  carouselBuyBtn.href = `product/index.html?id=${product.id}`;
}

// Adds a fade transition when changing products
function changeCarouselProduct(product) {
  carouselProduct.classList.add("fade");

  setTimeout(() => {
    renderCarouselProduct(product);
    carouselProduct.classList.remove("fade");
  }, 300);
}

// Moves to the next carousel product
function showNextProduct() {
  currentIndex++;

  if (currentIndex >= carouselProducts.length) {
    currentIndex = 0;
  }

  changeCarouselProduct(carouselProducts[currentIndex]);
}

// Moves to the previous carousel product
function showPreviousProduct() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = carouselProducts.length - 1;
  }

  changeCarouselProduct(carouselProducts[currentIndex]);
}

// Automatically changes the product every 7 seconds
function startCarousel() {
  setInterval(showNextProduct, 7000);
}

/* EVENT LISTENERS */

previousButton.addEventListener("click", showPreviousProduct);

nextButton.addEventListener("click", showNextProduct);

/* INITIALISE */

// Fetches products, selects carousel items and starts the carousel
async function init() {
  const products = await fetchProducts();

  // Initialise carousel
  carouselProducts = [products[16], products[1], products[10]];
  renderCarouselProduct(carouselProducts[currentIndex]);
  startCarousel();

  // Render top-rated products
  const topRatedProducts = getTopRatedProducts(products);
  renderProducts(topRatedProducts);
}

init();
