import express from 'express'
import config from 'config'
import connect from './db/connect'

const PORT = config.get('PORT') as number

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => {
	console.log(`Server listing on port ${PORT}.`)
	connect()
})

console.clear()
