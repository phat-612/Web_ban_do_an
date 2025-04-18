import multer from "multer";
import path from "path";

// Bộ lọc tệp để chỉ chấp nhận ảnh
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|webp/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Only images are allowed!");
  }
};

const createStorage = (folderName) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `src/public/imgs/${folderName}`);
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Tên tệp sẽ là thời gian hiện tại cộng với đuôi tệp gốc
      },
    }),
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 },
  });
};
export default createStorage;
