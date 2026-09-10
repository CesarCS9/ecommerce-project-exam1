'use strict';

/* DOM */

const cardPayment = document.querySelector("#card-payment");
const googlePay = document.querySelector("#google-pay");

cardPayment.addEventListener("change", function () {
    googlePay.parentElement.parentElement.classList.remove("selected");
    cardPayment.parentElement.parentElement.classList.add("selected");
});

googlePay.addEventListener("change", function () {
    cardPayment.parentElement.parentElement.classList.remove("selected");
    googlePay.parentElement.parentElement.classList.add("selected");
});