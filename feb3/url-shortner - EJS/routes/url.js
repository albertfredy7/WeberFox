const express = require('express')
const {handleGenerateNewShortUrl, handleGetAndRedirect,handleGetAnalytics} = require('../controllers/url')
const router = express.Router()

router.post('/',handleGenerateNewShortUrl)
router.get('/:shortId',handleGetAndRedirect)
router.get('/analytics/:shortId',handleGetAnalytics)

module.exports = router