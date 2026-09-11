"use strict";

/* DOM ELEMENTS */

const cartItems = document.querySelector(".cart-items");

const subtotal = document.querySelector(".subtotal");

/* API */

const API_URL = "https://v2.api.noroff.dev/online-shop";

/* GET CART */

function getCart() {
  // Get the cart from localStorage.
  // If there is no cart, return an empty array.
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  return cart;
}

/* FETCH CART PRODUCTS */

async function fetchCartProducts() {
  // Get the products stored in the cart.
  const cart = getCart();

  // Create an empty array to store the complete product data.
  const products = [];

  // Go through each item in the cart.
  for (const item of cart) {
    // Fetch the product using its ID.
    const response = await fetch(`${API_URL}/${item.id}`);
    const data = await response.json();

    // Add the quantity from the cart to the product.
    data.data.quantity = item.quantity;

    // Add the product to the products array.
    products.push(data.data);
  }

  return products;
}

/* RENDER CART */

function renderCart(products) {
  // Go through each product in the cart.
  products.forEach((product) => {
    // Create the main cart item container.
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    // Create the image container.
    const cartItemImage = document.createElement("div");
    cartItemImage.classList.add("cart-item-image");

    // Create the product image.
    const image = document.createElement("img");
    image.src = product.image.url;
    image.alt = product.image.alt;

    cartItemImage.appendChild(image);

    // Add the image container to the cart item.
    cartItem.appendChild(cartItemImage);

    // Create the product information container.
    const cartItemInfo = document.createElement("div");
    cartItemInfo.classList.add("cart-item-info");

    // Create the heading container.
    const cartItemHeading = document.createElement("div");
    cartItemHeading.classList.add("cart-item-heading");

    // Create the product title.
    const title = document.createElement("h2");
    title.textContent = product.title;

    cartItemHeading.appendChild(title);

    // Create the remove button.
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("remove-item");
    removeButton.setAttribute("aria-label", "Remove item");

    // Create the X icon.
    const removeIcon = document.createElement("i");
    removeIcon.classList.add("fa-solid", "fa-xmark");
    removeIcon.setAttribute("aria-hidden", "true");

    removeButton.appendChild(removeIcon);

    // Add the remove button to the heading.
    cartItemHeading.appendChild(removeButton);

    // Add the heading to the product information.
    cartItemInfo.appendChild(cartItemHeading);

    // Create the product price.
    const price = document.createElement("p");
    price.classList.add("cart-item-price");
    // Calculate the total price for this product based on its quantity.
    const itemTotal = product.price * product.quantity;

    price.textContent = `${itemTotal.toFixed(2)} NOK`;

    cartItemInfo.appendChild(price);

    // Create the quantity selector.
    const quantitySelector = document.createElement("div");
    quantitySelector.classList.add("quantity-selector");

    // Create the quantity input.
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.classList.add("quantity");
    quantityInput.value = product.quantity;
    quantityInput.min = "1";
    quantityInput.setAttribute("aria-label", "Quantity");

    quantitySelector.appendChild(quantityInput);

    // Add the quantity selector to the product information.
    cartItemInfo.appendChild(quantitySelector);

    // Add the product information to the cart item.
    cartItem.appendChild(cartItemInfo);

    // Add the complete cart item to the page.
    cartItems.appendChild(cartItem);
  });
}

/* SUBTOTAL */

function renderSubtotal(products) {
    // Start the subtotal at 0.
    let total = 0;

    // Go through each product in the cart.
    products.forEach((product) => {
        // Calculate the price of this product based on its quantity.
        total += product.price * product.quantity;
    });

    // Display the final subtotal.
    subtotal.textContent = `${total.toFixed(2)} NOK`;
}

/* INIT */

async function init() {
  // Fetch the complete product data from the cart.
  const products = await fetchCartProducts();

  // Render the products on the page.
  renderCart(products);

  // Calculate and display the cart subtotal.
    renderSubtotal(products);
}

init();
