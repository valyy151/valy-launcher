import jwt from 'jsonwebtoken'
import config from 'config'

const TOKEN_SECRET = config.get('privateKey') as string

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
	return jwt.sign(object, TOKEN_SECRET, options)
}

export function decode(token: string) {
	try {
		const decoded = jwt.verify(token, TOKEN_SECRET)

		return { valid: true, expired: false, decoded }
	} catch (error: any) {
		return {
			valid: false,
			expired: error.message === 'jwt expired',
			decoded: null,
		}
	}
}
