import Router from 'express'
import { followUnfollowUser, logout, updateProfilePic, updateUser, userLogin, userSignup, verifyEmail } from '../controllers/user.controller.js'
import { userAuth } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/multer.middleware.js'

const router= Router()

router.route('/userSignup').post(userSignup)
router.route("/verifyEmail/:token").get(verifyEmail)
router.route('/userLogin').post(userLogin)
router.route('/logout').get(userAuth,logout)
router.route('/updateUser').put(userAuth,updateUser)
router.route('/updateProfilePic').put(userAuth,upload.single('avatar'),updateProfilePic)
router.route('/follow/:id').put(userAuth,followUnfollowUser)




export default router
