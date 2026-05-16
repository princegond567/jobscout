import multer from "multer";

// Use memory storage for now; files can be uploaded to cloud storage later.
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
