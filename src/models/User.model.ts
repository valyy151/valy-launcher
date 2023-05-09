import mongoose from 'mongoose'

export interface UserDocument extends mongoose.Document {
	name: string
	email: string
	password: string
	createdAt: Date
	updatedAt: Date
}

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true, unique: true },
	},
	{ timestamps: true },
)

const User = mongoose.model<UserDocument>('User', UserSchema)

export default User
