'use strict';

/* DOM */

const cardPayment = document.querySelector("#card-payment");
const googlePay = document.querySelector("#google-pay");

const paymentTotals = document.querySelectorAll(".payment-total");

const checkoutForm = document.getElementById("checkout-form");

/* API */

const API_URL = "https://v2.api.noroff.dev/online-shop";

/* AUTHENTICATION */

const isLoggedIn = sessionStorage.getItem("accessToken");

if (!isLoggedIn) {
  window.location.href = "../account/login.html";
}

/* GET CART */

function getCart() {
  // Get the cart from session Storage.
  // If there is no cart, return an empty array.
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  return cart;
}

/* FETCH CART PRODUCTS*/

async function fetchCartProducts() {
    //Get the products stored in the cart
    const cart = getCart();

    //Create an empty array to store the complete product data
    const products = [];

    //Go through each item in the cart
    for (const item of cart) {
        //Fetch the product using its ID
        const response = await fetch (`${API_URL}/${item.id}`);
        const data = await response.json();

        //Add the quantity from the car to the product
        data.data.quantity = item.quantity;

        //Add the prodcut to the products array
        products.push(data.data);
    }

    return products;
    
}

/* CALCULATE TOTAL AMOUNT */

function renderTotal (products){
    //Start the total at 0
    let total = 0;

    //Calculate the total price
    products.forEach((product) => {
        total += product.price * product.quantity;
    });

    //Display the total for each payment option
    paymentTotals.forEach((paymentTotal) => {
        paymentTotal.textContent = `${total.toFixed(2)} NOK`;
    });
}

/* LISTENERS PAYMENT OPTIONS */

cardPayment.addEventListener("change", function () {
    googlePay.parentElement.parentElement.classList.remove("selected");
    cardPayment.parentElement.parentElement.classList.add("selected");
});

googlePay.addEventListener("change", function () {
    cardPayment.parentElement.parentElement.classList.remove("selected");
    googlePay.parentElement.parentElement.classList.add("selected");
});

checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  //Check the required fields 
  if (!checkoutForm.checkValidity()) {
    return;
  }

  // Save the completed order for the success page
  const products = await fetchCartProducts();
  sessionStorage.setItem("lastOrder", JSON.stringify(products));

  //Reset the cart
  sessionStorage.removeItem("cart");

  window.location.href = "../success/index.html";
});

/* INIT */

async function init() {
    //Fetch the products in the cart
    const products = await fetchCartProducts();

    //Calculate and display the total
    renderTotal(products);
    
}

init();