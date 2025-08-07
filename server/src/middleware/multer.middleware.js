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
const limits ={
  fileSize: 1024 * 1024 * 50

}

export const upload = multer({ storage, fileFilter, limits }) 