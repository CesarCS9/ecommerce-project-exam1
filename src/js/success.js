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

let currentIndex = 0;

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

    //Update page indicator
    orderIndicator.textContent = `${currentIndex + 1}/${order.length}`;
}

function renderTotal() {
    //Start the total at 0
    let total = 0;

    //Calculate the total price of the order
    order.forEach((product) => {
        total += product.price * product.quantity;
    });

    //Display the total
    orderTotal.textContent = `${total.toFixed(2)} NOK`;
}

/* LISTENERS */

orderNext.addEventListener('click', () => {
    if (currentIndex === order.length -1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    renderOrder(order[currentIndex]);
});

orderPrevious.addEventListener('click', () => {
    if (currentIndex === 0) {
        currentIndex = order.length -1;
    } else {
        currentIndex--;
    }
    renderOrder(order[currentIndex]);
});

const order = getOrder();

renderOrder(order[currentIndex]);
renderTotal();