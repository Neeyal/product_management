const express = require('express')
const multer = require('multer')
const { createProduct, getProducts, updateProduct } = require('../controllers/product-controller')

const router = express.Router()

const upload = multer({ dest: 'uploads/' })

router.post('/products', upload.single('image'), createProduct)
router.get('/products', getProducts)
router.put('/products/:id', upload.single('image'), updateProduct)

module.exports = router
