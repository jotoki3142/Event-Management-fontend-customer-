document.addEventListener("DOMContentLoaded", function () {
  // Xử lý chuyển đổi tab đăng nhập/đăng ký
  const authTabs = document.querySelectorAll(".auth-tab");
  const authForms = document.querySelectorAll(".auth-form");

  authTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      authTabs.forEach((t) => t.classList.remove("active"));
      authForms.forEach((f) => f.classList.remove("active"));
      this.classList.add("active");

      const tabName = this.getAttribute("data-tab");
      document.getElementById(`${tabName}-form`).classList.add("active");
    });
  });

  // Xử lý form đăng nhập
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("login-name").value.trim();
      const password = document.getElementById("login-password").value.trim();

      if (!name || !password) {
        alert("Vui lòng nhập đầy đủ thông tin đăng nhập!");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("TenDangNhap", name);
        formData.append("MatKhau", password);

        const response = await fetch(
          "http://localhost:5258/api/taiKhoan/dangNhap",
          {
            method: "POST",
            body: formData,
          }
        );

        const text = await response.text();
        console.log("📌 Phản hồi từ API:", text);

        let data;
        try {
          data = JSON.parse(text);
        } catch (jsonError) {
          console.error("❌ Lỗi parse JSON:", jsonError);
          alert("Phản hồi không hợp lệ từ máy chủ. Vui lòng thử lại.");
          return;
        }

        // ✅ Nếu phản hồi không thành công từ API (ví dụ 401, 403, 500,...)
        if (!response.ok) {
          alert(data.message || "Tên đăng nhập hoặc mật khẩu không đúng.");
          return;
        }

        // ✅ Kiểm tra trạng thái tài khoản
        if (!data.trangThai || data.trangThai.toLowerCase() !== "hoạt động") {
          alert("Tài khoản đã bị dừng hoạt động và không được phép truy cập.");
          return;
        }

        // ✅ Lưu thông tin đăng nhập
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userRole", data.vaiTro);
        localStorage.setItem("trangThai", data.trangThai);

        // ✅ Chuyển hướng theo vai trò
        if (data.vaiTro === "KhachHang") {
          alert(
            "Đăng nhập thành công! Chào mừng bạn đến với tài khoản khách hàng."
          );
          setTimeout(() => {
            window.location.href = "/my-account.html";
          }, 1000);
        } else if (data.vaiTro === "NhanVien") {
          alert("Đăng nhập thành công! Bạn đã vào hệ thống nhân viên.");
          setTimeout(() => {
            window.location.href = "/staff.html";
          }, 1000);
        } else if (data.vaiTro === "QuanLy") {
          alert("Đăng nhập thành công! Chào mừng bạn đến với trang quản lý.");
          setTimeout(() => {
            window.location.href = "/admin.html";
          }, 1000);
        } else {
          alert("Lỗi xác thực! Không xác định được vai trò.");
        }
      } catch (error) {
        console.error("❌ Lỗi kết nối hoặc logic:", error);
        alert("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
      }
    });
  }

  // Dang ky
  document
    .getElementById("register-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const fullName = document.getElementById("register-name").value.trim();
      const email = document.getElementById("register-email").value.trim();
      const phone = document.getElementById("register-phone").value.trim();
      const address = document.getElementById("register-address").value.trim();
      const username = document
        .getElementById("register-username")
        .value.trim();
      const password = document
        .getElementById("register-password")
        .value.trim();
      const confirmPassword = document
        .getElementById("register-confirm-password")
        .value.trim();
      if (
        !fullName ||
        !email ||
        !phone ||
        !address ||
        !username ||
        !password ||
        !confirmPassword
      ) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
      }

      

    
    });
});
//------------------//
// chọn giới tính (nam, nữ )trong đăng ký//

  const selected = document.getElementById('gender-selected');
  const options = document.getElementById('gender-options');
  const hiddenInput = document.getElementById('gender-value');

  selected.addEventListener('click', () => {
    const isOpen = options.style.display === 'block';
    options.style.display = isOpen ? 'none' : 'block';
    selected.classList.toggle('open', !isOpen);
  });

  document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => {
      selected.innerHTML = `${option.textContent} <span class="arrow">&#9662;</span>`;
      hiddenInput.value = option.getAttribute('data-value');
      options.style.display = 'none';
      selected.classList.remove('open');
    });
  });

  document.addEventListener('click', function (e) {
    if (!document.getElementById('gender-wrapper').contains(e.target)) {
      options.style.display = 'none';
      selected.classList.remove('open');
    }
  });



  //========================//
  //KHI ĐĂNG NHẬP THÌ QUAY VỀ TRANG CHỦ //
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  // Kiểm tra nếu đã đăng nhập, chuyển luôn về index.html
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    window.location.href = "index.html";
    return;
  }

  // Xử lý đăng nhập tài khoản mẫu
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("login-name").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (username === "lequankhach123" && password === "12345678") {
         // ✅ Lưu thông tin người dùng đầy đủ
const userData = {
  username: "lequankhach123",
  fullname: "Lê Anh Quân",
  phone: "0987654321",
  address: "123 Đường ABC, TP.HCM"
};
localStorage.setItem("currentUser", JSON.stringify(userData));

      alert("Đăng nhập thành công!");
      window.location.href = "index.html";
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  });
});







