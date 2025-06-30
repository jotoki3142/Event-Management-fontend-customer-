
//==========================//
// chức năng: - đăng nhập, đăng ký
//            - quên mật khẩu,nhập mã otp, nhập mật khẩu mới             
//==========================//
document.addEventListener("DOMContentLoaded", function () {
  // Lấy các section
  const forgotSection = document.getElementById("forgot-form");
  const otpSection = document.getElementById("otp-form").closest("div");
  const resetSection = document.getElementById("reset-password-form").closest("div");

  // ===== 1. Kiểm tra Quên mật khẩu (Email) =====
  const forgotForm = document.getElementById("forgot-form");
  if (forgotForm) {
    forgotForm.addEventListener("submit", function (e) {
      const emailInput = document.getElementById("email");
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      emailInput.style.borderColor = "";

      if (!email) {
        e.preventDefault();
        showError(emailInput, "Vui lòng điền vào trường này.");
        return;
      }

      if (!emailRegex.test(email)) {
        e.preventDefault();
        showError(emailInput, "Địa chỉ email không hợp lệ.");
        return;
      }

      clearError(emailInput);
      e.preventDefault(); // Tạm thời không gửi thật

      // Chuyển sang form OTP
      document.getElementById("forgot-section").classList.add("hidden");
      otpSection.classList.remove("hidden");
    });
  }

  // ===== 2. Kiểm tra Mã OTP =====
  const otpForm = document.getElementById("otp-form");
  if (otpForm) {
    otpForm.addEventListener("submit", function (e) {
      const otpInput = document.getElementById("otp");
      const otp = otpInput.value.trim();
      const otpError = document.getElementById("otp-error");

      otpInput.style.borderColor = "";
      otpError.textContent = "";

      if (!otp) {
        e.preventDefault();
        otpError.textContent = "Vui lòng nhập mã OTP.";
        otpInput.style.borderColor = "red";
        otpInput.focus();
        return;
      }

      const otpRegex = /^\d{6}$/;
      if (!otpRegex.test(otp)) {
        e.preventDefault();
        otpError.textContent = "Mã OTP phải gồm 6 chữ số.";
        otpInput.style.borderColor = "red";
        otpInput.focus();
        return;
      }

      otpError.textContent = "";
      otpInput.style.borderColor = "green";
      e.preventDefault(); // Tạm thời không gửi thật

      // Chuyển sang form đặt lại mật khẩu
      otpSection.classList.add("hidden");
      resetSection.classList.remove("hidden");
    });
  }

  // ===== 3. Kiểm tra Đặt lại mật khẩu =====
  const resetForm = document.getElementById("reset-password-form");
  if (resetForm) {
    resetForm.addEventListener("submit", function (e) {
      const newPass = document.getElementById("new-password");
      const confirmPass = document.getElementById("confirm-password");
      const errorText = document.getElementById("password-error");

      newPass.style.borderColor = "";
      confirmPass.style.borderColor = "";
      errorText.textContent = "";

      if (!newPass.value.trim() || !confirmPass.value.trim()) {
        e.preventDefault();
        errorText.textContent = "Vui lòng nhập đầy đủ mật khẩu.";
        newPass.style.borderColor = "red";
        confirmPass.style.borderColor = "red";
        return;
      }

      if (newPass.value !== confirmPass.value) {
        e.preventDefault();
        errorText.textContent = "Mật khẩu không khớp.";
        newPass.style.borderColor = "red";
        confirmPass.style.borderColor = "red";
        return;
      }

      errorText.textContent = "";
      newPass.style.borderColor = "green";
      confirmPass.style.borderColor = "green";

      alert("Đặt lại mật khẩu thành công!");
      e.preventDefault(); // Tạm thời chặn submit thật
    });
  }

  // ===== Hàm hiển thị lỗi =====
  function showError(inputElement, message) {
    let error = inputElement.nextElementSibling;
    if (!error || !error.classList.contains("error-message")) {
      error = document.createElement("small");
      error.className = "error-message";
      inputElement.parentNode.insertBefore(error, inputElement.nextSibling);
    }
    error.textContent = message;
    inputElement.style.borderColor = "red";
    inputElement.focus();
  }

  function clearError(inputElement) {
    let error = inputElement.nextElementSibling;
    if (error && error.classList.contains("error-message")) {
      error.textContent = "";
    }
    inputElement.style.borderColor = "green";
  }
});

