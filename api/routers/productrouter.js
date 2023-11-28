const express = require('express')
const router = express.Router()

const { allProducts, productByID, createProduct, updateProduct, deleteProduct } = require('../controllers/productcontroller')

router.get('/all-products',allProducts)
router.get('/product-by-id/:id', productByID)

router.post('/create-product',createProduct)

router.put('/update-product',updateProduct)

router.delete('/delete-product',deleteProduct)

module.exports = router 