import express from 'express'
import config from 'config'
import dotenv from 'dotenv'
import connect from './db/connect'

dotenv.config()

const PORT = process.env.PORT || config.get('PORT')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => {
	console.log(`Server listing on port ${PORT}.`)
	connect()
})

console.clear()
