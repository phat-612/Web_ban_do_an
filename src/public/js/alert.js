// function showAlert() {
//   const loginForm = document.getElementById("loginForm");

//   loginForm.addEventListener("submit", async function (event) {
//     // Ngăn hành động mặc định của form
//     event.preventDefault();

//     // Tạo formData để thu thập dữ liệu từ form
//     const formData = new FormData(loginForm);

//     try {
//       // Gửi yêu cầu đăng nhập đến server
//       const response = await fetch(loginForm.action, {
//         method: "POST",
//         body: formData,
//       });

//       // Chuyển phản hồi thành JSON
//       const result = await response.json();

//       // Hiển thị SweetAlert dựa trên phản hồi từ server
//       if (result.success) {
//         Swal.fire({
//           title: "Thành công!",
//           text: result.message,
//           icon: "success",
//           confirmButtonText: "OK",
//         }).then(() => {
//           // Tải lại trang hoặc chuyển hướng nếu đăng nhập thành công
//           window.location.reload();
//         });
//       } else {
//         Swal.fire({
//           title: "Thất bại!",
//           text: result.message,
//           icon: "error",
//           confirmButtonText: "Thử lại",
//         }).then(() => {
//           // Hiển thị lại modal nếu có lỗi
//           const loginModal = new bootstrap.Modal(
//             document.getElementById("ModalDangNhap")
//           );
//           loginModal.show();
//         });
//       }
//     } catch (error) {
//       // Hiển thị lỗi khi không thể kết nối với server
//       Swal.fire({
//         title: "Lỗi!",
//         text: "Không thể kết nối với máy chủ.",
//         icon: "error",
//         confirmButtonText: "Đóng",
//       });
//     }
//   });
// }

// // Gọi hàm khi tài liệu được tải xong
// document.addEventListener("DOMContentLoaded", showAlert);
