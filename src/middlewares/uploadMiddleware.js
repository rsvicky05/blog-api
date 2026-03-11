const multer = require('multer');
const path = require('path');
const AppError = require('../utils/AppError');
const {v4 : uuidv4} = require("uuid");

// console.log(foldername)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const foldername = path.join(__dirname, "../../uploads/");
        cb(null, foldername);
    },
    filename: (req, file, cb) => {
        const name = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, name);
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFiles = /jpeg|jpg|png/;
    const isAllowed = allowedFiles.test(file.mimetype)
    if(isAllowed) cb(null, true)
    else cb(new AppError("Unsupported File formats", 400), false)
}


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024
    },
    fileFilter
});

module.exports = upload;

