import express from 'express'
import { userControllers } from '../controllers/userControllers.js'
import { privateRoute } from '../config/passport.js'
const router = express.Router()


router.post('/register',userControllers.createUser )
router.post('/login',userControllers.login )
router.get('/list',privateRoute, userControllers.listUsers )


export default router