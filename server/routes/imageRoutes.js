import express from 'express'
import { removeBGImage } from '../controllers/ImageController.js'
import upload from '../middlewares/multer.js'
import authUser from '../middlewares/auth.js'


const imageRouter = express.Router()

imageRouter.post('/broremoval',upload.single('image'), authUser,removeBGImage)


export default imageRouter