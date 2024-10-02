document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navLinks = document.querySelector('.navLinks');


    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});
