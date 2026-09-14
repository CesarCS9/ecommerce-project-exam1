'use strict';

/* DOM ELEMENTS */

const registerForm = document.getElementById('register-form');

const registerMessage = document.querySelector(".register-message");

/* FORM SUBMIT */

registerForm.addEventListener("submit", (event) => {
    // Prevent the browser from reloading the page.
    event.preventDefault();

    // Get the email and password entered by the user.
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // Send the registration details to the API.
    registerUser(name, email, password);

});

/* REGISTER USER */

async function registerUser(name, email, password) {
    // Send the user's email and password to the register endpoint.
    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        }),
    });

    // Convert the API response to JSON.
    const data = await response.json();

    // Show the response in the console while testing.
    console.log(data);
}