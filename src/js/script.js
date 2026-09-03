const navBurger = document.querySelector('.nav-burger');
const mobileMenu = document.querySelector('.nav-mobile-menu');

navBurger.addEventListener('click', () => {
    const isOpen = navBurger.getAttribute('aria-expanded') === 'true';

    navBurger.setAttribute('aria-expanded', !isOpen);
    mobileMenu.classList.toggle('active');
})