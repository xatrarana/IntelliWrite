// lib/multer.ts
import multer from 'multer';

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({
  storage,
});

export default upload;