import multer from "multer";
import path from "path";

const tempFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
  tempFolder,
  uploadFolder: path.resolve(tempFolder, "uploads"),
  directory: tempFolder,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, fileName, cb) {
      const encode = Math.floor(Math.random() * 1000000000);
      const name = `${encode}-${fileName.originalname}`;

      return cb(null, name);
    },
  }),
};
