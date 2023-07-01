import express from 'express'
import { Request, Response } from 'express'
import loginUser from '../controllers/loginController'
import Authenticate from '../middleware/jwt.middleware'
import registerUser from '../controllers/registerController'

const router = express.Router()

router.post('/login', loginUser)

router.post('/register', registerUser)

router.get('/verify', Authenticate, (req: Request, res: Response) => {
	res.json({ message: 'Authentication middleware is working.', token: req.token })
})

module.exports = router
