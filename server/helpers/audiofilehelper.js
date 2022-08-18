import multer from 'multer';

const audioStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + Math.round(Math.random() * 1E9) + '-' + file.originalname)
    }
})

export const audioUpload = multer({
    storage: audioStorage,
    limits: {
        fileSize: 50000000
    },
   /*  fileFilter(req, file, cb) {
        if(file.mimetype === "audio/mpeg3") {
            cb(null, true)
        } else {
            cb(null, false)
        }
        } */
})