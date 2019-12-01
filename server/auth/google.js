const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
const {google} = require('googleapis')
const calendar = google.calendar('v3')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.')
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }

  const strategy = new GoogleStrategy(
    googleConfig,
    async (token, refreshToken, profile, done) => {
      const googleId = profile.id
      const email = profile.emails[0].value

      var oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_CALLBACK
      )
      oauth2Client.credentials = {
        access_token: token,
        refresh_token: refreshToken
      }
      let user = await User.findOne({
        where: {googleId, email: email}
      })
      if (!user) {
        await User.create({
          googleId,
          email: email,
          accessToken: token,
          refreshToken: refreshToken
        })
          .then(user => done(null, user))
          .catch(done)
      } else {
        await user
          .update({accessToken: token, refreshToken: refreshToken})
          .then(user => done(null, user))
          .catch(done)
      }
    }
  )

  passport.use(strategy)
  // console.log(`strategy ------>`, strategy['_oauth2'])

  router.get(
    '/',
    passport.authenticate('google', {
      scope: [
        'email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/calendar.events'
      ]
    })
  )

  router.get(
    '/callback',
    passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
