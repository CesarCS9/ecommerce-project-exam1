"use strict";

/* DOM ELEMENTS */

const carouselImage = document.querySelector(".carousel-image");
const carouselTitle = document.querySelector(".carousel-title");
const carouselBuyBtn = document.querySelector(".carousel-buy-btn");

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

function renderCarouselProduct(product) {
  carouselImage.src = product.image.url;
  carouselImage.alt = product.title;
  carouselTitle.textContent = product.title;
  carouselBuyBtn.textContent = `Buy ${product.price} NOK`;
  carouselBuyBtn.href = `product/index.html?id=${product.id}`;
}

/* INITIALISE */

async function init() {
    const products = await fetchProducts();

    const carouselProducts = [products[16], products[1], products[10]];

    renderCarouselProduct(carouselProducts[2]);   
}

init();