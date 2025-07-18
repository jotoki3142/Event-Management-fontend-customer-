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
// XỬ LÝ BIỂU TƯỢNG USER TRONG HEADER//
//=========================//
document.addEventListener("DOMContentLoaded", function () {
  const userIcon = document.getElementById("user-icon");
  if (userIcon) {
    // Kiểm tra cả 2 loại đăng nhập: API và tài khoản mẫu
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const authToken = localStorage.getItem("authToken");

    if (currentUser || authToken) {
      // Nếu đã đăng nhập, chuyển đến trang thông tin cá nhân
      userIcon.title = "Thông tin cá nhân";
      userIcon.setAttribute("href", "my-account.html");
    } else {
      // Nếu chưa đăng nhập, chuyển sang trang đăng nhập
      userIcon.title = "Đăng nhập";
      userIcon.setAttribute("href", "account.html");
    }
  }
});
//=========================//