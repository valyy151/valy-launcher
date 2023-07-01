// src/types/express/index.d.ts

import { JwtPayload } from 'jsonwebtoken'

// to make the file a module and avoid the TypeScript error
export {}

declare global {
	namespace Express {
		export interface Request {
			token?: JwtPayload
		}
	}
}
