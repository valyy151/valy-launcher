import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Response, Request } from 'express'

const TOKEN_SECRET = process.env.TOKEN_SECRET as string

export const SECRET_KEY: string = TOKEN_SECRET

export default async function Authenticate(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.header('Authorization')?.replace('Bearer ', '')

		if (!token) {
			throw new Error()
		}

		const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload
		req.token = decoded

		next()
	} catch (err) {
		res.status(401).json('Unauthorized.')
	}
}
