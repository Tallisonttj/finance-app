import express from 'express'
import { privateRoute } from '../config/passport.js'
import { userControllers } from '../controllers/userControllers.js'
const router = express.Router()


router.post('/register',userControllers.createUser )
router.post('/login',userControllers.login )
router.get('/list',privateRoute, userControllers.listUsers )
router.get('/userArea/:email',privateRoute, userControllers.userArea )
router.put('/userArea/:email',privateRoute, userControllers.userArea )


export default router