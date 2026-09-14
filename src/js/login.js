"use strict";

/* DOM ELEMENTS */

const loginForm = document.querySelector('.login-form');

const loginMessage = document.querySelector('.login-message');

/* FORM SUBMIT */

loginForm.addEventListener('submit', (event) => {
  // Prevent the browser from reloading the page.
  event.preventDefault();

  // Get the email and password entered by the user.
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  // Send the login details to the API.
  loginUser(email, password);
});

/* LOGIN USER */

async function loginUser(email, password) {
  // Send the user's email and password to the login endpoint.
  const response = await fetch('https://v2.api.noroff.dev/auth/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  // Convert the API response to JSON.
  const data = await response.json();

  if (response.ok){
    localStorage.setItem('accessToken', data.data.accessToken);
    window.location.href = '../index.html';

  } else {
    // Show the API response in the console while testing.
    console.log(data);
  }

}