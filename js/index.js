//-------------------------------//
// hiện phần 4 câu hỏi //
document.addEventListener("DOMContentLoaded", function() {
    // Lấy tất cả button trong accordion
    const buttons = document.querySelectorAll("#accordion .card-header button");

    buttons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.preventDefault();

            const targetId = this.getAttribute("data-target");
            const target = document.querySelector(targetId);

            // Ẩn tất cả các phần collapse khác
            document.querySelectorAll("#accordion .collapse").forEach(function(collapse) {
                if (collapse !== target) {
                    collapse.classList.remove("show");
                }
            });

            // Toggle phần được click
            target.classList.toggle("show");
        });
    });
});

//====================//
// XỬ LÝ PHẦN ĐĂNG NHẬP//
//====================//
// Xử lý sự kiện khi nhấn vào icon người dùng
document.addEventListener("DOMContentLoaded", function () {
  const userIcon = document.getElementById("user-icon");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    // Đổi tooltip hoặc nội dung nếu muốn
    userIcon.title = "Đăng xuất";

    userIcon.addEventListener("click", function (e) {
      e.preventDefault();
      const confirmLogout = confirm("Bạn có muốn đăng xuất không?");
      if (confirmLogout) {
        localStorage.removeItem("currentUser");
        window.location.href = "account.html";
      }
    });
  } else {
    // Nếu chưa đăng nhập, chuyển sang trang đăng nhập
    userIcon.setAttribute("href", "account.html");
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById("featured-events-container");

  // Lấy 3 sự kiện đầu tiên (hoặc chọn theo điều kiện nổi bật tùy bạn)
  const featuredEvents = eventList.slice(0, 3);

  featuredEvents.forEach(event => {
    const startDate = new Date(event.start).toLocaleString("vi-VN");
    const endDate = new Date(event.end).toLocaleString("vi-VN");

    const html = `
      <div class="event-card">
        <div class="event-image">
          <img src="${event.image}" alt="${event.title}" />
        </div>
        <div class="event-info">
          <div class="event-meta">
            <span class="event-date-start">
              <i class="fas fa-calendar-alt"></i> Bắt đầu: ${startDate}
            </span>
            <span class="event-date-end">
              <i class="fas fa-calendar-check"></i> Kết thúc: ${endDate}
            </span>
          </div>
          <h3 class="event-title">${event.title}</h3>
          <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
          <div class="event-footer">
            <span class="event-price">${parseInt(event.price).toLocaleString()}₫</span>
            <a href="event-detail.html?id=${event.id}" class="btn-detail">Xem chi tiết</a>
            <a href="register-event.html?id=${event.id}" class="btn-register">Đăng ký</a>
          </div>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", html);
  });
});


