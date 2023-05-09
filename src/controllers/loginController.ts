import bcrypt from 'bcrypt'
import User from '../models/User.model'
import jwt, { Secret } from 'jsonwebtoken'
import { Request, Response } from 'express'

interface RequestBodyProps {
	email: string
	password: string
	rememberMe: boolean
}

const loginUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password, rememberMe }: RequestBodyProps = req.body

		if (!email || !password) {
			res.status(400).json({ message: 'Please provide an email and a password.' })
			return
		}

		const user = await User.findOne({ email })
		if (!user) {
			res.status(401).json({ message: 'Wrong email or password.' })
			return
		}

		const passwordCorrect = bcrypt.compareSync(password, user.password)

		if (passwordCorrect) {
			const { _id, name } = user

			const payload = { _id, name }

			let expiresIn = '6h'
			if (rememberMe) {
				expiresIn = '365d'
			}

			const TOKEN_SECRET: Secret | undefined = process.env.TOKEN_SECRET

			if (!TOKEN_SECRET) {
				res.status(400).json({ message: 'Token secret is missing.' })
				return
			}

			const token = jwt.sign(payload, TOKEN_SECRET, {
				algorithm: 'HS256',
				expiresIn: expiresIn,
			})

			res.status(200).json({ token: token, user: { name: user.name, id: user._id } })
		} else {
			res.status(401).json({ message: 'Wrong email or password.' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Something went wrong.' })
	}
}

export default loginUser
