import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
	res.json('Evertything is working.')
})

module.exports = router
