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

//----------------------------------//
//DANH MỤC SỰ KIỆN HIỆN Ở PHẦN FOOTER//
//----------------------------------//
document.addEventListener("DOMContentLoaded", () => {
  const footerCat = document.getElementById("footer-categories");
  if (!footerCat || typeof eventList === "undefined") return;

  // Lấy các danh mục không trùng
  const categories = [...new Set(eventList.map(e => e.category))];

  // Tên hiển thị tiếng Việt cho danh mục
  const categoryNames = {
    music: "Âm nhạc",
    tech: "Công nghệ",
    education: "Giáo dục",
    festival: "Lễ hội"
  };

  // Gán HTML danh mục
  footerCat.innerHTML = categories.map(cat => `
    <a href="event.html?category=${cat}">${categoryNames[cat] || cat}</a>
  `).join("");
});
//=========================//