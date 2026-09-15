'use strict';

/* DOM ELEMENTS */

const navWelcome = document.querySelector('.nav-welcome');
const navDesktopLinks = document.querySelector('.nav-desktop-links');

/* AUTHENTICATION */

const accessToken = localStorage.getItem('accessToken');
const email = localStorage.getItem('email');

if (accessToken) {
    //User is logged in
    console.log('user is logged in', email);

    // Get username from email
const username = email.split('@')[0];

    // Show user email
    navWelcome.textContent = `Hi, ${username} :)`;
} else {
    //User is no logged in
    console.log('User is not logged in');
}