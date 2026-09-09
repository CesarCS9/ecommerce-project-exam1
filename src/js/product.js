"use strict";

/* DOM ELEMENTS */

const productImage = document.querySelector('.product-image img');
const productTitle = document.querySelector('.product-heading h1');
const productRating = document.querySelector('product-rating');
const productPrice = document.querySelector('.product-price');
const productDescription = document.querySelector('.product-description');
const productTags = document.querySelector('.product-tags');

/* API */

const API_URL = "https://v2.api.noroff.dev/online-shop";

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

/* FETCH PRODUCT */

async function fetchProduct() {
    try {
        const response = await fetch(`${API_URL}/${productId}`);
        const data = await response.json();

        console.log(data.data);
        return data.data;
    } catch (error) {
        console.error('Failed to fetch product');
    }
    
}

/* RENDER */

function renderProduct(product){

    /* Product Image */
    productImage.src = product.image.url;
    productImage.alt = product.image.alt;

    /* Product information */
    productTitle.textContent = product.title;
    productPrice.textContent = `${product.price} NOK`;
    productDescription.textContent = product.description;

    productTags.textContent = product.tags;
}

/* INIT */

async function init() {
    const product = await fetchProduct();

    renderProduct(product);
    
}

init();