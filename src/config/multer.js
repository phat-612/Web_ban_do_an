import multer from "multer";
import path from "path";

// Đặt vị trí lưu trữ và đặt tên tệp
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/imgs/products"); // Thư mục lưu trữ ảnh
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Tên tệp sẽ là thời gian hiện tại cộng với đuôi tệp gốc
  },
});

// Bộ lọc tệp để chỉ chấp nhận ảnh
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Only images are allowed!");
  }
};

// Khởi tạo multer với cấu hình
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Giới hạn kích thước 5MB
  fileFilter: fileFilter,
});

export default upload;
