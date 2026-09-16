"use strict";

/* DOM ELEMENTS */

const navWelcome = document.querySelector(".nav-welcome");
const navDesktopLinks = document.querySelector(".nav-desktop-links");

const loginLink = document.getElementById("login-link");
const mobileLoginLink = document.getElementById("mobile-login-link");

const registerLink = document.getElementById("register-link");
const mobileRegisterLink = document.getElementById("mobile-register-link");

/* AUTHENTICATION */

const accessToken = localStorage.getItem("accessToken");
const email = localStorage.getItem("email");

if (accessToken) {
  //User is logged in
  console.log("user is logged in", email);

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
  mobileMenu.appendChild(mobileLoginLink);
} else {
  //User is no logged in
  console.log("User is not logged in");
}

/* LOGOUT */

loginLink.addEventListener('click', (event) => {
    if (accessToken){
        event.preventDefault();

        localStorage.removeItem('accessToken');
        localStorage.removeItem('email');

        window.location.href = loginLink.href;
    }
});

mobileLoginLink.addEventListener('click', (event) => {
    if (accessToken) {
        event.preventDefault();

        localStorage.removeItem('accessToken');
        localStorage.removeItem('email');

        window.location.href = mobileLoginLink.href;

    }
});