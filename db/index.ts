import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/employee-manager'

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log(`Connected to Database.`)
	})
	.catch((err: {}) => {
		console.error('Error connecting to Database. ', err)
	})
