// Khi người dùng nhấn vào "Quên mật khẩu?", thay đổi nội dung modal
document.getElementById("forgotPasswordLink").addEventListener("click", (e) => {
  e.preventDefault();

  // Đổi tiêu đề modal và ẩn form đăng nhập
  document.getElementById("loginModalLabel").textContent = "Quên mật khẩu";
  document.getElementById("forgotPasswordSection").style.display = "block";
  document.getElementById("loginForm").style.display = "none";
});

// Gửi OTP
document.getElementById("sendOtpButton").addEventListener("click", () => {
  const phoneNumber = document.getElementById("forgotPhone").value;
  if (phoneNumber) {
    sendOTP(phoneNumber);
  } else {
    alert("Vui lòng nhập số điện thoại.");
  }
});

// Xác nhận OTP và đặt lại mật khẩu
document.getElementById("resetPasswordButton").addEventListener("click", () => {
  const otpCode = document.getElementById("otpCode").value;
  const newPassword = document.getElementById("newPassword").value;

  if (otpCode && newPassword) {
    verifyOTPAndResetPassword(otpCode, newPassword);
  } else {
    alert("Vui lòng nhập mã OTP và mật khẩu mới.");
  }
});

// Các hàm xử lý gửi OTP và xác nhận OTP (các hàm đã được cung cấp trước đó)
const sendOTP = (phoneNumber) => {
  const appVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
    }
  );

  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("Mã OTP đã được gửi. Vui lòng kiểm tra điện thoại của bạn.");

      // Hiển thị phần nhập mã OTP và mật khẩu mới
      document.getElementById("otpSection").style.display = "block";
      document.getElementById("newPasswordSection").style.display = "block";
      document.getElementById("resetPasswordButton").style.display = "block";
    })
    .catch((error) => {
      console.error("Lỗi khi gửi OTP:", error);
    });
};

const verifyOTPAndResetPassword = (otpCode, newPassword) => {
  window.confirmationResult
    .confirm(otpCode)
    .then((result) => {
      alert("Xác thực OTP thành công. Mật khẩu đã được thay đổi.");
      // Tại đây, có thể cập nhật mật khẩu mới vào cơ sở dữ liệu.
    })
    .catch((error) => {
      alert("Mã OTP không đúng. Vui lòng thử lại.");
      console.error("Lỗi xác thực OTP:", error);
    });
};
