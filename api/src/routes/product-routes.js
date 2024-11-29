import express from 'express'
import multer from 'multer'
import { createProduct, getProducts, updateProduct } from '../controllers/product-controller.js'

const router = express.Router()

const upload = multer({ dest: 'uploads/' })

router.post('/products', upload.array('images', 10), createProduct)
router.get('/products', getProducts)
router.put('/products/:id', upload.array('images', 10), updateProduct)

export default router
