
import Router from 'express'
import { userAuth } from '../middleware/authMiddleware.js'
import { addPost, deletePost, getAllPosts, getUserPosts, likePost, updatePost } from '../controllers/post.controller.js'
import { upload } from '../middleware/multer.middleware.js'

const router= Router()
router.route('/addPost').post(userAuth, upload.array("posts", 5), addPost)
router.route('/deletePost/:id').delete(userAuth,deletePost)
router.route('/updatePost/:id').put(userAuth, updatePost)
router.route('/getUserPost').get(userAuth,getUserPosts)
router.route('/likePost/:id').put(userAuth,likePost)
router.route('/getAllPosts').get(userAuth,getAllPosts)

export default router