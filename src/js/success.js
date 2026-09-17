'use-strict'

/* DOM */

const orderItemImage = document.getElementById('order-item-image');
const orderItemTitle = document.getElementById('order-item-title');
const orderItemQuantity = document.getElementById('order-item-quantity');
const orderItemPrice = document.getElementById('order-item-price');

const orderIndicator = document.getElementById('order-indicator');

const orderTotal = document.getElementById('order-total');

const orderPrevious = document.getElementById('order-previous');
const orderNext = document.getElementById('order-next');

/* GET ORDER */

function getOrder() {
    //Get the completed order from localStorage
    //If there is no order, return empty array
    const order = JSON.parse(localStorage.getItem('lastOrder')) || [];
    return order;
}

/* RENDER */

function renderOrder(product) {
    //Render product image
    orderItemImage.src = product.image.url;
    orderItemImage.alt = product.image.alt;

    //Render the product title
    orderItemTitle.textContent = product.title;

    //Render the product price
    const itemTotal = product.price * product.quantity;
    orderItemPrice.textContent = `${itemTotal.toFixed(2)} NOK`;
}

const order = getOrder();

renderOrder(order[0]);