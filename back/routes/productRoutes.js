const express = require('express')
const router = express.Router()

const productCtrl = require('../controllers/productCtrl.js')

const auth = require('../middleware/auth.js')

router.get('/', productCtrl.getProducts)

router.post('/', productCtrl.addProduct)

module.exports = router