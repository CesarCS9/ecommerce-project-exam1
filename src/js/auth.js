"use strict";

/* DOM ELEMENTS */

const navWelcome = document.querySelector(".nav-welcome");

const loginLink = document.getElementById("login-link");
const mobileLoginLink = document.getElementById("mobile-login-link");

const registerLink = document.getElementById("register-link");
const mobileRegisterLink = document.getElementById("mobile-register-link");

const authMobileMenu = document.querySelector(".nav-mobile-menu");

/* AUTHENTICATION */

const accessToken = sessionStorage.getItem("accessToken");
const email = sessionStorage.getItem("email");

if (accessToken) {

  // Get username from email
  const username = email.split("@")[0];

  // Show user email
  navWelcome.textContent = `Hi, ${username} :)`;

  //Change nav if user is logged
  loginLink.textContent = "Log out";
  mobileLoginLink.textContent = "Log out";

  //Hide links if user is logged
  registerLink.style.display = "none";
  mobileRegisterLink.style.display = "none";

  // Move logout link to the bottom.
  authMobileMenu.appendChild(mobileLoginLink);
} 

/* LOGOUT */

loginLink.addEventListener("click", (event) => {
  if (accessToken) {
    event.preventDefault();

    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("email");

    // Clear the cart when logging out.
    sessionStorage.removeItem("cart");

    window.location.href = loginLink.href;
  }
});

mobileLoginLink.addEventListener("click", (event) => {
  if (accessToken) {
    event.preventDefault();

    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("email");

    // Clear the cart when logging out.
    sessionStorage.removeItem("cart");

    window.location.href = mobileLoginLink.href;
  }
});
