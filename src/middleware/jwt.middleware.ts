import config from 'config'
import { Request } from 'express'
const { expressjwt: jwt } = require('express-jwt')

const TOKEN_SECRET = process.env.TOKEN_SECRET || (config.get('TOKEN_SECRET') as string)

const isAuthenticated = jwt({
	secret: TOKEN_SECRET,
	algorithms: ['HS256'],
	requestProperty: 'payload',
	getToken: getTokenFromHeaders,
})

function getTokenFromHeaders(req: Request) {
	{
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			const token = req.headers.authorization.split(' ')[1]

			return token
		}

		return null
	}
}

export default isAuthenticated
