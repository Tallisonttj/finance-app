import express from 'express'
import { privateRoute } from '../config/passport.js'
import { categoryController } from '../controllers/categoryController.js'
const router = express.Router()


router.post('/newCategory',privateRoute, categoryController.createCategory )
router.get('/listCategory',privateRoute, categoryController.listCategory)
router.put('/updateCategory/:id',privateRoute, categoryController.updateCategory)
router.delete('/deleteCategory/:id',privateRoute, categoryController.deleteCategory)



export default router