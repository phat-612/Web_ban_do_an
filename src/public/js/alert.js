function showAlert() {
  document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("#ModalDangNhap form");

    if (loginForm) {
      const successMessage = loginForm.getAttribute("data-success");
      const errorMessage = loginForm.getAttribute("data-error");

      if (successMessage) {
        Swal.fire({
          title: "Thành công!",
          text: successMessage,
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      if (errorMessage) {
        Swal.fire({
          title: "Thất bại!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Thử lại",
        });

        // Chỉ hiển thị lại modal nếu có lỗi
        // const loginModal = new bootstrap.Modal(
        //   document.getElementById("ModalDangNhap")
        // );
        // loginModal.show();
      }
    }
  });
}

showAlert();
