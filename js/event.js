// ✅ Lấy danh sách sự kiện từ file eventDL.js
const events = eventList;

// 🔹 Gán các phần tử DOM
const eventGrid = document.getElementById("eventGrid");
const pagination = document.getElementById("pagination");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const categoryLinks = document.querySelectorAll(".event-categories a");

// 🔹 Biến trạng thái
let currentPage = 1;
const eventsPerPage = 9;
let currentCategory = "all";
const urlParams = new URLSearchParams(window.location.search);
const urlCategory = urlParams.get("category");
if (urlCategory) {
  currentCategory = urlCategory;
}

let currentMaxPrice = parseInt(priceRange.value);

// 🔹 Lấy từ khóa tìm kiếm từ URL nếu có
let searchKeyword = new URLSearchParams(window.location.search).get("keyword")?.trim().toLowerCase() || "";

// 🔹 Hàm hiển thị sự kiện
function renderEvents() {
  // Lọc dữ liệu theo danh mục, giá, và từ khóa (nếu có)
  let filtered = events.filter(e => {
    const matchCategory = currentCategory === "all" || e.category === currentCategory;
    const matchPrice = parseInt(e.price) <= currentMaxPrice;
    const matchKeyword = !searchKeyword || e.title.toLowerCase().includes(searchKeyword);
    return matchCategory && matchPrice && matchKeyword;
  });

  const totalPages = Math.ceil(filtered.length / eventsPerPage);
  if (currentPage > totalPages) currentPage = 1;

  const start = (currentPage - 1) * eventsPerPage;
  const paginated = filtered.slice(start, start + eventsPerPage);

  // Hiển thị các sự kiện
  eventGrid.innerHTML = paginated.map(event => `
    <div class="event-card">
      <div class="event-image">
        <img src="${event.image}" alt="${event.title}" />
      </div>
      <div class="event-info">
        <div class="event-meta">
          <span><i class="fas fa-calendar-alt"></i> ${new Date(event.start).toLocaleString("vi-VN")}</span><br>
          <span><i class="fas fa-calendar-check"></i> ${new Date(event.end).toLocaleString("vi-VN")}</span>
        </div>
        <h3 class="event-title">${event.title}</h3>
        <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
        <div class="event-footer">
          <span class="event-price">${parseInt(event.price).toLocaleString("vi-VN")}₫</span>
          <a href="event-detail.html?id=${event.id}" class="btn-detail">Chi tiết</a>
          <a href="register-event.html?id=${event.id}" class="btn-register">Đăng ký</a>
        </div>
      </div>
    </div>
  `).join("");

  renderPagination(totalPages);
}

// 🔹 Hàm tạo các nút phân trang
function renderPagination(totalPages) {
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = (i === currentPage) ? "active" : "";
    btn.addEventListener("click", () => {
      currentPage = i;
      renderEvents();
    });
    pagination.appendChild(btn);
  }
}

// 🔹 Bắt sự kiện thay đổi thanh lọc giá
priceRange.addEventListener("input", () => {
  currentMaxPrice = parseInt(priceRange.value);
  priceValue.textContent = currentMaxPrice.toLocaleString("vi-VN") + "₫";
  renderEvents();
});

// 🔹 Bắt sự kiện chọn danh mục
categoryLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    currentCategory = link.dataset.category;
    currentPage = 1;
    searchKeyword = ""; // ✅ Xóa từ khóa tìm kiếm khi chọn danh mục
    renderEvents();
  });
});

// 🔹 Gọi khi trang vừa tải xong
renderEvents();
