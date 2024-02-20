import './styles/main.scss';
window.addEventListener('load', () => {
   const hamburger = document.querySelector('.header__hamburger');
   const overlay = document.querySelector('.overlay');
   const nav = document.querySelector('.header__nav');
   const body = document.body;

   hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('hamburger--close');
      hamburger.classList.toggle('hamburger--open');

      overlay.classList.toggle('overlay--visible');

      nav.classList.toggle('open-menu');

      body.classList.toggle('scroll--disable');
   });
});
