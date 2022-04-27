const express = require('express')
const router = express.Router()

const productCtrl = require('../controllers/productCtrl.js')

const auth = require('../middleware/auth.js')

router.get('/', auth, productCtrl.getProducts)
router.get('/:id', auth, productCtrl.getProduct)

router.post('/',auth, productCtrl.addProduct)

router.put('/like/:id', productCtrl.likeDislikes)

router.delete('/:id', auth, productCtrl.delProduct)

module.exports = router