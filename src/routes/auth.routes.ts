import express from 'express'
import loginUser from '../controllers/loginController'
import authenticate from '../middleware/jwt.middleware'
import registerUser from '../controllers/registerController'

const router = express.Router()

router.post('/login', loginUser)

router.post('/register', registerUser)

router.get('/verify', authenticate, (req, res) => {
	res.json('Authentication middleware is working.')
})

module.exports = router
