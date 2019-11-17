const router = require('express').Router()
const {User} = require('../db/models')
const {google} = require('googleapis')
const calendar = google.calendar('v3')
var unirest = require('unirest')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // console.log(`param query HERE`, req.query)
    var oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_CALLBACK
    )
    oauth2Client.credentials = {
      access_token: req.user.accessToken
    }
    let {data} = await calendar.events.list({
      auth: oauth2Client,
      calendarId: 'primary',
      timeMin: req.query.timeMin,
      timeMax: req.query.timeMax,
      singleEvents: true,
      orderBy: 'startTime'
    })
    res.send(data)
  } catch (error) {
    next(error)
  }
})
