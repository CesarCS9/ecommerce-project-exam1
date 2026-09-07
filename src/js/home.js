"use strict";

/* DOM ELEMENTS */

const carouselImage = document.querySelector(".carousel-image");
const carouselTitle = document.querySelector(".carousel-title");
const carouselBuyBtn = document.querySelector(".carousel-buy-btn");
const previousButton = document.querySelector(".carousel-button-previous");
const nextButton = document.querySelector(".carousel-button-next");
const carouselProduct = document.querySelector(".carousel-product");

/* API */

const API_URL = "https://v2.api.noroff.dev/online-shop";

/* FETCH PRODUCTS */

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error("Failed to fetch products");
  }
}

/* CAROUSEL */

let carouselProducts = [];
let currentIndex = 0;

function renderCarouselProduct(product) {
  carouselImage.src = product.image.url;
  carouselImage.alt = product.title;
  carouselTitle.textContent = product.title;
  carouselBuyBtn.textContent = `Buy ${product.price} NOK`;
  carouselBuyBtn.href = `product/index.html?id=${product.id}`;
}

function showNextProduct() {
  currentIndex++;
  
  if (currentIndex >= carouselProducts.length) {
    currentIndex = 0;
  }

  changeCarouselProduct(carouselProducts[currentIndex]);
}

function showPreviousProduct() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = carouselProducts.length - 1;
  }

  changeCarouselProduct(carouselProducts[currentIndex]);
}

previousButton.addEventListener("click", showPreviousProduct);

nextButton.addEventListener("click", showNextProduct);

function changeCarouselProduct(product) {
    carouselProduct.classList.add("fade");

    setTimeout(() => {
        renderCarouselProduct(product);
        carouselProduct.classList.remove("fade");
    }, 300);
}

function startCarousel() {
    setInterval(showNextProduct, 7000);
}

/* INITIALISE */

async function init() {
    const products = await fetchProducts();

    carouselProducts = [products[16], products[1], products[10]];

    renderCarouselProduct(carouselProducts[currentIndex]);   

    startCarousel();
}

init();