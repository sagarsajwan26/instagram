import multer from 'multer'


const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {

  if (
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/')
  ) {
    cb(null, true)
  } else {
    cb(new Error('Only image and video files are allowed!'), false)
  }
}

export const upload = multer({ storage, fileFilter }) 