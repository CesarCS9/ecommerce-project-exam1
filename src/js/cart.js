"use strict";

/* DOM ELEMENTS */

const cartItems = document.querySelector(".cart-items");

const subtotal = document.querySelector(".subtotal");

const clearCartButton = document.querySelector(".clear-cart");

const checkoutButton = document.getElementById("checkout-button");

/* API */

const API_URL = "https://v2.api.noroff.dev/online-shop";

/* AUTHENTICATION */

const isLoggedIn = sessionStorage.getItem("accessToken");

/* GET CART */

function getCart() {
  // Get the cart from localStorage.
  // If there is no cart, return an empty array.
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  return cart;
}

/* EMPTY CART */

function renderEmptyCart() {
  cartItems.innerHTML = "";

  const emptyMessage = document.createElement("p");
  emptyMessage.classList.add("empty-cart-message");

  if (isLoggedIn) {
    emptyMessage.textContent =
      "Oops! Your cart is empty. Please add some products to your cart to see them here.";

    checkoutButton.textContent = "Continue shopping";
    checkoutButton.href = "../index.html";
  } else {
    emptyMessage.textContent = "Please log in to add products to your cart.";

    checkoutButton.textContent = "Log in";
    checkoutButton.href = "../account/login.html";
  }

  cartItems.appendChild(emptyMessage);
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

    // Store the product ID in the cart item.
    cartItem.dataset.id = product.id;

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

    // Listen for clicks on the remove button.
    removeButton.addEventListener("click", () => {
      // Get the current cart from localStorage.
      const cart = getCart();

      // Remove the product with this ID from the cart.
      const updatedCart = cart.filter((item) => item.id !== product.id);

      // Save the updated cart to sessionStorage.
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));

      // Remove the product card from the page.
      cartItem.remove();

      // Find the product in the products array.
      const productIndex = products.findIndex((item) => item.id === product.id);

      // Remove the product from the products array.
      products.splice(productIndex, 1);

      // Show the empty cart state if needed.
      if (updatedCart.length === 0) {
        renderEmptyCart();
      }

      // Update the subtotal.
      renderSubtotal(products);
    });

    // Add the heading to the product information.
    cartItemInfo.appendChild(cartItemHeading);

    // Create the product price.
    const price = document.createElement("p");
    price.classList.add("cart-item-price");

    // Use the discounted price when available
    let itemPrice;

    if (product.discountedPrice < product.price) {
      itemPrice = product.discountedPrice;
    } else {
      itemPrice = product.price;
    }

    // Calculate the total price for this product based on its quantity.
    const itemTotal = itemPrice * product.quantity;

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

    // Listen for changes to the quantity input.
    quantityInput.addEventListener("change", () => {
      // Get the new quantity from the input.
      const newQuantity = Number(quantityInput.value);

      // Get the current cart from sessionStorage.
      const cart = getCart();

      // Find the product in the cart using its ID.
      const cartProduct = cart.find((item) => item.id === product.id);

      // Update the quantity.
      cartProduct.quantity = newQuantity;

      // Save the updated cart to sessionStorage.
      sessionStorage.setItem("cart", JSON.stringify(cart));

      // Update the quantity in the product object.
      product.quantity = newQuantity;

      // Use the discounted price when available.
      let itemPrice;

      if (product.discountedPrice < product.price) {
        itemPrice = product.discountedPrice;
      } else {
        itemPrice = product.price;
      }

      // Calculate the new total price for this product.
      const newItemTotal = itemPrice * newQuantity;

      // Update the price shown on the page.
      price.textContent = `${newItemTotal.toFixed(2)} NOK`;

      // Update the subtotal on the page.
      renderSubtotal(products);
    });

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
    // Use the discounted price when available.
    let itemPrice;

    if (product.discountedPrice < product.price) {
      itemPrice = product.discountedPrice;
    } else {
      itemPrice = product.price;
    }

    // Calculate the price of this product based on its quantity.
    total += itemPrice * product.quantity;
  });

  // Display the final subtotal.
  subtotal.textContent = `${total.toFixed(2)} NOK`;
}

/* CLEAR CART */

clearCartButton.addEventListener("click", () => {
  // Remove all products from sessionStorage.
  sessionStorage.removeItem("cart");

  // Show the empty cart state.
  renderEmptyCart();

  // Reset the subtotal.
  subtotal.textContent = "0.00 NOK";
});

/* INIT */

async function init() {
  // Show the login message if the user is not logged in.
  if (!isLoggedIn) {
    renderEmptyCart();
    return;
  }

  // Fetch the complete product data from the cart.
  const products = await fetchCartProducts();

  if (products.length === 0) {
    // Show the appropriate empty cart message.
    renderEmptyCart();
  } else {
    // Render the products in the cart.
    renderCart(products);
  }

  // Calculate and display the cart subtotal.
  renderSubtotal(products);
}

init();
