const multer = require("multer");
const fs = require('fs');

// สร้างโฟลดเดอร์ ถ้าไม่มีโฟลเดอร์
// Vercel's filesystem is read-only except /tmp
const folderName = process.env.VERCEL ? '/tmp/uploads' : 'uploads';
fs.mkdir(folderName, { recursive: true }, (err) => {
  if (err) return console.error('Cannot create upload folder', err);
  console.log('Folder created successfully.');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderName);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = decodeURIComponent(file.originalname) //ถอดรหัส
    cb(null, uniqueSuffix);
  },
});
exports.upload = multer({ storage: storage }).single("file")
