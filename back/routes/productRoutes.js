const express = require('express')
const router = express.Router()

const productCtrl = require('../controllers/productCtrl.js')

const auth = require('../middleware/auth.js')

router.get('/', productCtrl.getProducts)
router.get('/:id', productCtrl.getProduct)

router.post('/', productCtrl.addProduct)

router.delete('/:id', productCtrl.delProduct)

module.exports = router