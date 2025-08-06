import Router from 'express'
import { userAuth } from '../middleware/authMiddleware.js'
import { addComment, deleteComment, editComment, getComments } from '../controllers/comment.controller.js'

const router= Router()

router.route('/addComment/:id').post(userAuth,addComment)
router.route('/deleteComment/:id').delete(userAuth,deleteComment)
router.route('/updateComment/:id').put(userAuth,editComment)
router.route('/getComments/:id').get(userAuth,getComments)

export default router