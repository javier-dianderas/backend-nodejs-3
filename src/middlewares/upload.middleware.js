import multer from "multer";
import { createError } from "../utils/apiResponse.js";
import { ERROR_CODES } from "../utils/errorDictionary.js";
import { config } from "../config/index.js";
import fs from "node:fs";
import path from "node:path";
import { DOCUMENT_TYPES } from "../utils/constants.js";

const allowedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp'
]

const ensureFolderExists = (folder) => {
    if(!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
}

const getDestinationFolder = (req) => {
    const documentType = req.body?.type;
    let folder;
    if(documentType === DOCUMENT_TYPES.DRIVER_LICENSE) {
        folder = config.nodeEnv === "test" ? "uploads/test/licenses" : "uploads/licenses";        
    }
    if(documentType === DOCUMENT_TYPES.DELIVERY_PROOF) {
        folder = config.nodeEnv === "test" ? "uploads/test/proofs" : "uploads/proofs";        
    }
    if(documentType === DOCUMENT_TYPES.USER_DOCUMENT) {
        folder = config.nodeEnv === "test" ? "uploads/test/documents" : "uploads/documents";        
    }
    if(!folder) {
        folder = config.nodeEnv === "test" ? "uploads/test" : "uploads";
    }
    return folder;
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const folder = getDestinationFolder(req);
        ensureFolderExists(folder);
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname);
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
        callback(null, fileName);
    }
});

const fileFilter = (req, file, callback) => {
    if(allowedMimeTypes.includes(file.mimetype)) {
        return callback(null, true);
    }
    callback(createError(ERROR_CODES.INVALID_FILE_TYPE));
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1
    }
});

export default upload;