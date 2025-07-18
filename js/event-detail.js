// ✅ Lấy danh sách sự kiện dùng chung
const events = eventList;

// ✅ Lấy ID từ URL
const urlParams = new URLSearchParams(window.location.search);
const eventId = parseInt(urlParams.get("id")); // ID là số

// ✅ Hàm định dạng thời gian
function formatDateTime(datetimeStr) {
  const d = new Date(datetimeStr);
  return d.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// ✅ Tìm sự kiện theo ID
const event = events.find(e => e.id === eventId);

if (!event) {
  document.getElementById("event-title").textContent = "Không tìm thấy sự kiện.";
} else {
  // ✅ Hiển thị thông tin sự kiện
  document.getElementById("event-img").src = event.image;
  document.getElementById("event-title").textContent = event.title;
  document.getElementById("event-start").textContent = formatDateTime(event.start);
  document.getElementById("event-end").textContent = formatDateTime(event.end);
  document.getElementById("event-location").textContent = event.location;
  document.getElementById("event-price").textContent = parseInt(event.price).toLocaleString("vi-VN") + "₫";
  document.getElementById("event-description").textContent = event.description;
  document.getElementById("event-seats").textContent = `${event.bookedSeats}/${event.totalSeats}`;
  document.getElementById("register-link").href = `register-event.html?id=${event.id}`;

  // ✅ Xác định trạng thái sự kiện
  const now = new Date();
  const startTime = new Date(event.start);
  const endTime = new Date(event.end);

let timeStatus = "";
let seatStatus = "";

// Xác định trạng thái thời gian
if (now < startTime) {
  timeStatus = "Sắp diễn ra";
} else if (now >= startTime && now <= endTime) {
  timeStatus = "Đang diễn ra";
} else {
  timeStatus = "Đã kết thúc";
}

// Chỉ kiểm tra tình trạng chỗ nếu sự kiện chưa kết thúc
if (now < endTime) {
  seatStatus = (event.bookedSeats >= event.totalSeats) ? "Hết chỗ" : "Còn chỗ";
} else {
  seatStatus = ""; // Sự kiện kết thúc thì không quan tâm chỗ
}

// Kết hợp nếu muốn:
let status = timeStatus;
if (seatStatus) status += ` - ${seatStatus}`;

// Ví dụ output:
// "Sắp diễn ra - Còn chỗ"
// "Đang diễn ra - Hết chỗ"
// "Đã kết thúc"


  document.getElementById("event-status").textContent = status;

  // ✅ PHẦN ĐÁNH GIÁ – hiển thị nếu sự kiện đã kết thúc
  if (now > endTime) {
    const reviewSection = document.getElementById("review-section");
    const reviewList = document.getElementById("review-list");
    const reviewForm = document.getElementById("review-form");

    reviewSection.style.display = "block";

    const storageKey = "event-reviews-" + event.id;
    let reviews = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Nếu chưa có đánh giá nào thì thêm đánh giá mẫu (1 lần duy nhất)
    if (reviews.length === 0) {
      reviews = [
        { name: "Nguyễn Văn A", stars: "5", content: "Sự kiện rất chuyên nghiệp, mình học được nhiều điều." },
        { name: "Trần Thị B", stars: "4", content: "Tổ chức tốt, nhưng phần âm thanh chưa hoàn hảo lắm." },
        { name: "Lê Văn C", stars: "5", content: "Thật sự đáng giá tiền. Rất ấn tượng!" }
      ];
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    }

    // ✅ Hiển thị tất cả đánh giá
    renderReviews(reviews);

    // ✅ Kiểm tra xem người dùng có được phép gửi đánh giá không
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    const joinedEvents = currentUser.suKienDaDangKy || [];

    const canReview = currentUser.username && Array.isArray(joinedEvents) && joinedEvents.includes(eventId);

    if (canReview) {
      // ✅ Cho phép gửi đánh giá
      reviewForm.style.display = "block";

      reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const stars = document.getElementById("review-stars").value;
        const content = document.getElementById("review-content").value.trim();
        const name = currentUser.fullname || currentUser.username || "Ẩn danh";

        if (!stars || !content) {
          alert("Vui lòng nhập đầy đủ đánh giá.");
          return;
        }

        const newReview = { name, stars, content };
        reviews.push(newReview);
        localStorage.setItem(storageKey, JSON.stringify(reviews));
        renderReviews(reviews);
        reviewForm.reset();
      });
    } else {
      // ❌ Không được phép → Ẩn form + hiện thông báo
      reviewForm.style.display = "none";
      const warning = document.createElement("p");
      warning.textContent = "🔒 Chỉ người đã đăng nhập và tham gia sự kiện mới được đánh giá.";
      warning.style.color = "gray";
      reviewForm.parentNode.insertBefore(warning, reviewForm);
    }

    // ✅ Hàm render các đánh giá
    function renderReviews(reviews) {
      reviewList.innerHTML = "";
      reviews.forEach((r) => {
        const item = document.createElement("div");
        item.classList.add("review-item");
        item.innerHTML = `
          <p><strong>${r.name}</strong> - ${r.stars} ⭐</p>
          <p>${r.content}</p>
        `;
        reviewList.appendChild(item);
      });
    }
  }
}
