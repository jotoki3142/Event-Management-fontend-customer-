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
});
