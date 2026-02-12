import multer from "multer";
import fs from "fs";
import path from "path";
import { GENERIC_FILE_UPLOAD_ERRORS } from "./constants/errors.constants";

type CompoundIds = {
  userId: string;
  relId: string;
};

export function createMulter(dir: string, ids?: CompoundIds) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const mimeType = path.extname(file.originalname);
      const name = path.basename(file.originalname, mimeType);
      const now = new Date();
      const timestamp = now.toISOString().replace(/:/g, "-");
      const compoundKey =
        ids?.userId !== undefined && ids?.relId !== undefined
          ? `${ids.userId.substring(0, 12)}_${ids.relId.substring(0, 12)}_`
          : "";

      const newFilename = `${timestamp}_${compoundKey}${name}${mimeType}`;
      cb(null, newFilename);
    },
  });

  return multer({
    storage: storage,
    // 5MB upload limit
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowed = ["image/jpeg", "image/png", "image/gif"];
      if (!allowed.includes(file.mimetype)) {
        return cb(new Error(GENERIC_FILE_UPLOAD_ERRORS.unAllowedFileFormat));
      }
      cb(null, true);
    },
  });
}
