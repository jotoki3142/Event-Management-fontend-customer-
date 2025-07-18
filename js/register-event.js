document.addEventListener('DOMContentLoaded', function () {
  // ====== Lấy dữ liệu từ eventDL.js ======
  const events = eventList;
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = parseInt(urlParams.get("id"));
  const event = events.find(e => e.id === eventId);


  // ====== Đổ thông tin sự kiện vào giao diện ======
  document.querySelectorAll("#event-title").forEach(el => el.textContent = event.title);
  document.querySelectorAll("#event-start").forEach(el => el.textContent = formatDateTime(event.start));
  document.querySelectorAll("#event-end").forEach(el => el.textContent = formatDateTime(event.end));
  document.querySelectorAll("#event-location").forEach(el => el.textContent = event.location);
  document.querySelectorAll("#event-price").forEach(el => el.textContent = parseInt(event.price).toLocaleString("vi-VN") + " ₫");

  // ====== Tạo sơ đồ chỗ ngồi ======
  const seatsContainers = document.getElementById('seatsContainers');
  const bookButton = document.getElementById('bookButton');
  const bookingSummary = document.getElementById('bookingSummary');
  const confirmButton = document.getElementById('confirmButton');
  const cancelButton = document.getElementById('cancelButton');
  const downloadTicket = document.getElementById('downloadTicket');
  const countdownElement = document.getElementById('time');
  const overlay = document.getElementById('overlay');
  const modalClose = document.getElementById('modalClose');

  const ticket = document.getElementById('ticket');
  const paymentInfo = document.getElementById('paymentInfo');

  let countdownInterval;
  let secondsRemaining = 180;
  const totalSeats = 100;
  const bookedSeats = new Set();
  const selectedSeats = new Set();

  // Giả định 30 ghế đã được đặt trước (demo)
  for (let i = 0; i < 30; i++) {
    const r = Math.floor(Math.random() * totalSeats) + 1;
    bookedSeats.add(r);
  }

  // Tạo các chỗ ngồi
  for (let i = 1; i <= totalSeats; i++) {
    const seat = document.createElement('div');
    seat.className = 'seat';
    seat.textContent = i;
    seat.dataset.seatNumber = i;

    if (bookedSeats.has(i)) seat.classList.add('booked');

seat.addEventListener('click', function () {
  if (this.classList.contains('booked')) return;

  const num = parseInt(this.dataset.seatNumber);

  // Nếu đã chọn ghế này rồi thì bỏ chọn
  if (selectedSeats.has(num)) {
    selectedSeats.delete(num);
    this.classList.remove('selected');
  } else {
    // Nếu đã chọn ghế khác trước đó, thì bỏ chọn ghế cũ
    if (selectedSeats.size > 0) {
      const prevSelected = Array.from(selectedSeats)[0];
      const prevSeatEl = document.querySelector(`.seat[data-seat-number="${prevSelected}"]`);
      if (prevSeatEl) prevSeatEl.classList.remove('selected');
      selectedSeats.clear();
    }

    // Chọn ghế mới
    selectedSeats.add(num);
    this.classList.add('selected');
  }

  bookButton.disabled = selectedSeats.size === 0;
});


    seatsContainers.appendChild(seat);
  }

  // ====== Khi bấm "Đặt vé" ======
  bookButton.addEventListener('click', function () {
    if (selectedSeats.size === 0) return;

    const ticketPrice = parseInt(event.price.replace(/[^\d]/g, ""));
    const totalPrice = selectedSeats.size * ticketPrice;

    document.getElementById("summarySeats").textContent = Array.from(selectedSeats).join(", ");
    document.getElementById("summaryTotal").textContent = totalPrice.toLocaleString("vi-VN") + " ₫";
    window.__currentTotalPrice = totalPrice;

    document.querySelector(".seating-chart").style.display = "none";
    bookingSummary.style.display = "block";
    startCountdown();
  });

  // ====== Khi bấm "Hủy" ======
  cancelButton.addEventListener('click', function () {
    bookingSummary.style.display = 'none';
    document.querySelector('.seating-chart').style.display = 'block';
    clearInterval(countdownInterval);
    secondsRemaining = 180;
    countdownElement.textContent = "03:00";
  });

  // ====== Khi bấm "Thanh toán" ======
  confirmButton.addEventListener('click', function () {
    bookingSummary.style.display = 'none';
    document.getElementById('paymentTotal').textContent = window.__currentTotalPrice.toLocaleString("vi-VN") + " ₫";
    paymentInfo.style.display = 'block';
  });

  // ====== Khi xác nhận thanh toán thành công ======
  document.getElementById('confirmPaymentButton').addEventListener('click', function () {
    const ticketCode = 'TICKET-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    clearInterval(countdownInterval);

    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const paymentName = {
      momo: "Ví MoMo",
      zalopay: "Ví ZaloPay",
      banking: "Chuyển khoản ngân hàng",
      cash: "Tiền mặt"
    }[paymentMethod];

    document.getElementById('ticketName').textContent = "Nguyễn Văn A";
    document.getElementById('ticketSeats').textContent = Array.from(selectedSeats).join(", ");
    document.getElementById('ticketPayment').textContent = paymentName;
    document.getElementById('ticketDate').textContent = new Date().toLocaleString("vi-VN");
    document.getElementById('ticketCode').textContent = ticketCode;

    const seats = document.querySelectorAll('.seat.selected');
    seats.forEach(seat => {
      seat.classList.remove('selected');
      seat.classList.add('booked');
      bookedSeats.add(parseInt(seat.dataset.seatNumber));
    });
    selectedSeats.clear();

    paymentInfo.style.display = 'none';
    ticket.style.display = 'block';
  });

  // ====== Tải vé HTML ======
  downloadTicket.addEventListener('click', function () {
    const html = document.getElementById('ticket').outerHTML;
    const blob = new Blob([html], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 've-tham-du.html';
    link.click();
  });

  // ====== Countdown 3 phút thanh toán ======
  function startCountdown() {
    clearInterval(countdownInterval);
    secondsRemaining = 180;
    countdownElement.textContent = "03:00";

    countdownInterval = setInterval(() => {
      secondsRemaining--;
      const m = String(Math.floor(secondsRemaining / 60)).padStart(2, '0');
      const s = String(secondsRemaining % 60).padStart(2, '0');
      countdownElement.textContent = `${m}:${s}`;

      if (secondsRemaining <= 0) {
        clearInterval(countdownInterval);
        overlay.style.display = 'flex';

        // Giải phóng ghế
        selectedSeats.forEach(num => {
          const seat = document.querySelector(`.seat[data-seat-number="${num}"]`);
          if (seat) {
            seat.classList.remove('selected');
            seat.classList.remove('booked');
          }
        });
        selectedSeats.clear();
      }
    }, 1000);
  }

  // ====== Đóng overlay khi hết thời gian ======
  modalClose.addEventListener('click', function () {
    overlay.style.display = 'none';
  });

  // ====== Hàm định dạng thời gian ======
  function formatDateTime(str) {
    const d = new Date(str);
    return d.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
});