import multer from "multer";
import fs from "fs";
import path from "path";

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
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      const now = new Date();
      const compoundKey =
        ids?.userId !== undefined && ids?.relId !== undefined
          ? `${ids.userId.substring(0, 12)}_${ids.relId.substring(0, 12)}_`
          : "";

      const newFilename = `${now.toISOString()}_${compoundKey}${name}${ext}`;
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
        return cb(new Error("Only JPG, PNG, and GIF formats are allowed!"));
      }
      cb(null, true);
    },
  });
}
