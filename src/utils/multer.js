import multer from 'multer';
import sharp from 'sharp'
import AppError from '../helpers/errorHandler';

//storage configuration

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, '../images')
//   },
//   filename: (req, res, cb) => {
//       const ext = file.mimetype.split('/')[1];
//       cb(null, `user-${req.user.id}-${Date.now()}-${ext}`);
//   }
// })

const storage = multer.memoryStorage();

// check for file type
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
      cb(null, true)
  } else {
      cb(new AppError('please upload an image', 400), false)
  }
}
const upload = multer({
  storage,
  fileFilter
});

export const resizeUserPhoto = async (req, res, next) => {
 if (!req.file) return next();
 req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`);
await sharp(req.file.buffer)
.resize(500, 500)
.toFormat('jpeg')
.jpeg({ quality: 90})
.toFile(`images/${req.file.filename}`);

next();
}

// uploading multiple image

export const uploadMultiple = upload.fields([
  { name: 'imageCover', maxCount: 1},
  {name:'images', maxCount: 3}
]

)

export const resizeMultiplePhoto = (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next()
 
  req.body.imageCoverImage   = `user-${req.params.id}-${Date.now()}.jpeg`;
// cover image
 await sharp(req.files.imageCover[0].buffer)
.resize(2000, 1333)
.toFormat('jpeg')
.jpeg({ quality: 90})
.toFile(`images/${req.body.imageCoverImage }`);

//images
await promise.all(req.files.images.map( async (file, i)=> {
  const filename = `user-${req.params.id}-${Date.now()}-${i +1 }.jpeg`;
  await sharp(file.buffer)
  .resize(2000, 1333)
  .toFormat('jpeg')
  .jpeg({ quality: 90})
  .toFile(`images/${filename }`);
  req.body.images.push(filename)
}))
  next()
}
export default upload.single('photo')