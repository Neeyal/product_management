import express from 'express'
import multer from 'multer'
import { createProduct, getProducts, updateProduct } from '../controllers/product-controller.js'

const router = express.Router()

const upload = multer({ dest: 'uploads/' })

router.post('/products', upload.single('image'), createProduct)
router.get('/products', getProducts)
router.put('/products/:id', upload.single('image'), updateProduct)

export default router
