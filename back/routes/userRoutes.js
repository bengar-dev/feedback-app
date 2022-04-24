const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/userCtrl.js')

const auth = require('../middleware/auth.js')
const multer = require('../middleware/multer.js')

router.get('/', userCtrl.getUsers)
router.get('/:id', userCtrl.getUser)

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)

router.delete('/:id', userCtrl.delUser)

module.exports = router