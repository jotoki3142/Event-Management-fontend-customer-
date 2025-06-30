// ✅ Lấy danh sách sự kiện dùng chung
const events = eventList;

// ✅ Lấy ID từ URL
const urlParams = new URLSearchParams(window.location.search);
const eventId = parseInt(urlParams.get("id")); // Phải parseInt vì dữ liệu id là số

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

// ✅ Nếu không tìm thấy sự kiện
if (!event) {
  document.getElementById("event-title").textContent = "Không tìm thấy sự kiện.";
} else {
  // ✅ Đổ dữ liệu ra trang
  document.getElementById("event-img").src = event.image;
  document.getElementById("event-title").textContent = event.title;
  document.getElementById("event-start").textContent = formatDateTime(event.start);
  document.getElementById("event-end").textContent = formatDateTime(event.end);
  document.getElementById("event-location").textContent = event.location;
  document.getElementById("event-price").textContent = parseInt(event.price).toLocaleString("vi-VN") + "₫";
  document.getElementById("event-description").textContent = event.description;
  document.getElementById("event-seats").textContent = `${event.bookedSeats}/${event.totalSeats}`;
  document.getElementById("register-link").href = `register-event.html?id=${event.id}`;

  // ✅ Trạng thái sự kiện
  const now = new Date();
  const startTime = new Date(event.start);
  const endTime = new Date(event.end);

  let status = "";
  if (now < startTime) {
    status = (event.bookedSeats >= event.totalSeats) ? "Hết chỗ" : "Còn chỗ";
  } else if (now >= startTime && now <= endTime) {
    status = "Đang diễn ra";
  } else {
    status = "Đã kết thúc";
  }

  document.getElementById("event-status").textContent = status;

  // ✅ PHẦN ĐÁNH GIÁ – chỉ hiển thị nếu đã kết thúc
  if (now > endTime) {
    const reviewSection = document.getElementById("review-section");
    const reviewList = document.getElementById("review-list");
    const reviewForm = document.getElementById("review-form");

    reviewSection.style.display = "block";

    // Lấy đánh giá từ localStorage
    const storageKey = "event-reviews-" + event.id;
    let reviews = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Nếu chưa có thì tạo mẫu mặc định
    if (reviews.length === 0) {
      reviews = [
        { name: "Nguyễn Văn A", stars: "5", content: "Sự kiện rất chuyên nghiệp, mình học được nhiều điều." },
        { name: "Trần Thị B", stars: "4", content: "Tổ chức tốt, nhưng phần âm thanh chưa hoàn hảo lắm." },
        { name: "Lê Văn C", stars: "5", content: "Thật sự đáng giá tiền. Rất ấn tượng!" }
      ];
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    }

    renderReviews(reviews);

    // Gửi đánh giá mới
    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("reviewer-name").value.trim();
      const stars = document.getElementById("review-stars").value;
      const content = document.getElementById("review-content").value.trim();

      if (!name || !stars || !content) return;

      const newReview = { name, stars, content };
      reviews.push(newReview);
      localStorage.setItem(storageKey, JSON.stringify(reviews));
      renderReviews(reviews);
      reviewForm.reset();
    });

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
