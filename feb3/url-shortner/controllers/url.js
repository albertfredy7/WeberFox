
const URL = require('../models/urlModel');
const short = require('shortid');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body
    if (!body) {
        return res.status(400).json({ message: "Invalid Enter the url to shorten" })
    }
    const shortID = short()
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    })
    return res.status(200).json({ id: shortID })

}

async function handleGetAndRedirect(req, res) {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timeStamp: Date.now()
                }
            }
        }
       
    )
    res.redirect(entry.redirectURL)

}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId
    const results = await URL.findOne({shortId})
    return res.status(200).json({Total_Clicks : results.visitHistory.length,Analytic:results.visitHistory})
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAndRedirect,
    handleGetAnalytics
}