import bcrypt from 'bcrypt'
import User from '../models/User.model'
import { Request, Response } from 'express'

const registerUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { name, email, password } = req.body

		if (!name || !email || !password) {
			res.status(400).json({ message: 'Please fill out all the fields.' })
			return
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

		if (!emailRegex.test(email)) {
			res.status(400).json({ message: 'Please provide a valid email address.' })
			return
		}

		const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

		if (!passwordRegex.test(password)) {
			res.status(400).json({
				message:
					'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.',
			})
			return
		}

		const existingUser = await User.findOne({ email })

		if (existingUser) {
			res.status(400).json({ message: 'User already exists.' })
			return
		}

		const salt = bcrypt.genSaltSync()
		const hashedPassword = bcrypt.hashSync(password, salt)

		await User.create({ name, email, password: hashedPassword })

		res.status(201).json({ message: 'User created successfully.' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Something went wrong.' })
	}
}

export default registerUser
