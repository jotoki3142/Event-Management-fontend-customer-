document.addEventListener("DOMContentLoaded", function () {
  // ===== Sidebar chuyển tab section =====
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  const sections = document.querySelectorAll(".section");

  sidebarItems.forEach(item => {
    item.addEventListener("click", function () {
      // Xóa tất cả trạng thái active
      sidebarItems.forEach(i => i.classList.remove("active"));
      sections.forEach(section => section.classList.add("hidden"));

      // Active mục được chọn
      this.classList.add("active");
      const targetId = this.getAttribute("data-section");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.remove("hidden");
      }
    });
  });

  // ===== Dropdown chọn giới tính =====
  const genderSelected = document.getElementById("gender-selected");
  const genderOptions = document.getElementById("gender-options");
  const genderValue = document.getElementById("gender-value");

  if (genderSelected && genderOptions && genderValue) {
    genderSelected.addEventListener("click", () => {
      genderOptions.style.display =
        genderOptions.style.display === "block" ? "none" : "block";
    });

    genderOptions.querySelectorAll(".option").forEach(option => {
      option.addEventListener("click", () => {
        genderSelected.innerHTML =
          option.textContent + ' <span class="arrow">&#9662;</span>';
        genderValue.value = option.getAttribute("data-value");
        genderOptions.style.display = "none";
      });
    });

    // Tắt dropdown khi click ra ngoài
    document.addEventListener("click", (e) => {
      if (!genderSelected.contains(e.target) && !genderOptions.contains(e.target)) {
        genderOptions.style.display = "none";
      }
    });
  }

  // ===== Xử lý đăng xuất =====
  const logoutSidebar = document.getElementById("logout-sidebar");
  const logoutPopup = document.getElementById("logout-popup");
  const cancelLogoutBtn = document.getElementById("cancel-logout");
  const confirmLogoutBtn = document.getElementById("confirm-logout");

  // Hiện popup khi click vào "ĐĂNG XUẤT" trong sidebar
  if (logoutSidebar) {
    logoutSidebar.addEventListener("click", function () {
      logoutPopup.classList.add("show");
    });
  }

  // Ẩn popup khi click nút "Hủy"
  if (cancelLogoutBtn) {
    cancelLogoutBtn.addEventListener("click", function () {
      logoutPopup.classList.remove("show");
    });
  }

  // Xử lý đăng xuất khi click nút "Đăng xuất"
  if (confirmLogoutBtn) {
    confirmLogoutBtn.addEventListener("click", function () {
      // Xóa tất cả thông tin đăng nhập
      localStorage.removeItem("currentUser");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("trangThai");
      
      alert("Đăng xuất thành công!");
      window.location.href = "index.html";
    });
  }

  // Ẩn popup khi click ra ngoài
  if (logoutPopup) {
    logoutPopup.addEventListener("click", function (e) {
      if (e.target === logoutPopup) {
        logoutPopup.classList.remove("show");
      }
    });
  }

  // ===== Load thông tin người dùng vào form =====
  function loadUserInfo() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const authToken = localStorage.getItem("authToken");
    
    if (!currentUser && !authToken) {
      // Nếu chưa đăng nhập, chuyển về trang đăng nhập
      window.location.href = "account.html";
      return;
    }

    // Load thông tin từ tài khoản mẫu
    if (currentUser) {
      document.getElementById("register-name").value = currentUser.fullname || "";
      document.getElementById("register-phone").value = currentUser.phone || "";
      document.getElementById("register-address").value = currentUser.address || "";
      // Có thể thêm các trường khác nếu có
    }
  }

  // Gọi hàm load thông tin khi trang được load
  loadUserInfo();

  // ===== Xử lý lưu thông tin cá nhân =====
  const personalInfoForm = document.getElementById("personal-info-form");
  if (personalInfoForm) {
    personalInfoForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      const fullName = document.getElementById("register-name").value.trim();
      const phone = document.getElementById("register-phone").value.trim();
      const address = document.getElementById("register-address").value.trim();
      
      if (!fullName || !phone || !address) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      // Cập nhật thông tin trong localStorage
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        currentUser.fullname = fullName;
        currentUser.phone = phone;
        currentUser.address = address;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      }

      alert("Cập nhật thông tin thành công!");
    });
  }

  // ===== Xử lý đổi mật khẩu =====
  const accountInfoForm = document.getElementById("account-info-form");
  if (accountInfoForm) {
    accountInfoForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      const currentPassword = document.getElementById("current-password").value.trim();
      const newPassword = document.getElementById("new-password").value.trim();
      const confirmPassword = document.getElementById("confirm-password").value.trim();
      
      if (!currentPassword || !newPassword || !confirmPassword) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
      }

      // Ở đây có thể thêm logic gọi API để đổi mật khẩu
      alert("Đổi mật khẩu thành công!");
      
      // Reset form
      accountInfoForm.reset();
    });
  }
});
