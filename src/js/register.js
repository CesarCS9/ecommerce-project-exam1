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

    // Check if the register worked
    if (response.ok) {
        showRegistrationSuccess();
    } else {
        registerMessage.textContent = data.errors[0].message;
    }
}

function showRegistrationSuccess() {

    const successCard = document.createElement("div");
    successCard.classList.add("registration-success");

    const heading = document.createElement("h2");
    heading.textContent = "Registration successful!";

    const message = document.createElement("p");
    message.textContent = "Your account has been created successfully.";

    const loginMessage = document.createElement("p");
    loginMessage.textContent = "Please log in to continue.";

    const loginLink = document.createElement("a");
    loginLink.href = "login.html";
    loginLink.textContent = "Log in";
    loginLink.classList.add("login-link");

    successCard.appendChild(heading);
    successCard.appendChild(message);
    successCard.appendChild(loginMessage);
    successCard.appendChild(loginLink);

    registerForm.replaceWith(successCard);
}