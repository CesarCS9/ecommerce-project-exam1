"use strict";

// Burger menu
const navBurger = document.querySelector('.nav-burger');
const mobileMenu = document.querySelector('.nav-mobile-menu');

navBurger.addEventListener('click', () => {
    const isOpen = navBurger.getAttribute('aria-expanded') === 'true';

    navBurger.setAttribute('aria-expanded', !isOpen);
    mobileMenu.classList.toggle('active');
})

// Close the mobile menu
function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  navBurger.setAttribute("aria-expanded", "false");
}

// Close the menu when clicking outside
document.addEventListener("click", (event) => {
  if (
    mobileMenu.classList.contains("active") &&
    !mobileMenu.contains(event.target) &&
    !navBurger.contains(event.target)
  ) {
    closeMobileMenu();
  }
});

// Close the menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll("a");

mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Close the menu when scrolling
window.addEventListener("scroll", () => {
  if (mobileMenu.classList.contains("active")) {
    closeMobileMenu();
  }
});