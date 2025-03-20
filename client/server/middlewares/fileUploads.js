const multer = require('multer');
const path = require('path');

const createStorage = (folder) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadPath = path.join(process.cwd(), "uploads", folder);
            cb(null, uploadPath)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    });

    return storage;
}

const fileFilter = (allowTypes) => (req, file, cb) => {
    const isValid = allowTypes.test(file.mimetype);
    isValid ? cb(null, true) : cb(new Error("Invalid file type!"));
}

const limits = {
    image: 2 * 1024 * 1024, //2mb
};

module.exports.imageUploader = multer({
    storage: createStorage("student-images"),
    limits: { fileSize: limits.image },
    fileFilter:fileFilter(/jpeg|jpg|png/)
}).single('image');

