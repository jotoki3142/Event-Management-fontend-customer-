//=========================//
// HIỆN MENU MOBILE//
//=========================//
function toggleMenu() {
  const menu = document.querySelector('.main-menu');
  const btn = document.querySelector('.hamburger');
  menu.classList.toggle('active');
  btn.classList.toggle('active');
}

//-------------------------------//
// chuyển slider trong 3 giây//
//-------------------------------//
window.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.hero-slider-active', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    }
  });
});
