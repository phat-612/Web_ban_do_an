function showAlert(event) {
  // Ngăn hành động mặc định của form
  event.preventDefault();

  // Lấy thông báo từ thuộc tính của form
  const loginForm = document.querySelector("#ModalDangNhap form");
  const successMessage = loginForm.getAttribute("data-success");
  const errorMessage = loginForm.getAttribute("data-error");

  // Hiển thị thông báo thành công hoặc thất bại
  if (successMessage) {
    Swal.fire({
      title: "Thành công!",
      text: successMessage,
      icon: "success",
      confirmButtonText: "OK",
    });
  } else if (errorMessage) {
    Swal.fire({
      title: "Thất bại!",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "Thử lại",
    }).then(() => {
      // Hiển thị lại modal nếu có lỗi
      const loginModal = new bootstrap.Modal(
        document.getElementById("ModalDangNhap")
      );
      loginModal.show();
    });
  }
}
