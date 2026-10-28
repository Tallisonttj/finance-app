import express from 'express'
import { privateRoute } from '../config/passport.js'
import { transactionController } from '../controllers/transactionController.js'
const router = express.Router()


router.post('/newTransaction',privateRoute, transactionController.createTransaction )
router.get('/listTransaction',privateRoute, transactionController.listTransaction )
router.put('/updateTransaction/:id',privateRoute, transactionController.updateTransaction )
router.put('/updateStatus/:id',privateRoute, transactionController.updateSatus)
router.delete('/delTransaction/:id',privateRoute, transactionController.delete )
router.delete('/delAllTransaction',privateRoute, transactionController.deleteMany )



export default router