const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.get('/search', async (req, res, next) => {
  console.log(`here is my query params`, req.query)
  try {
    let {data} = await axios.get(
      'https://api.foursquare.com/v2/venues/search',
      {
        params: {
          near: req.query.near,
          radius: 800,
          intent: 'browse',
          categoryId: req.query.categoryId,
          limit: '15',
          client_id: process.env.FOURSQUARE_CLIENT_ID,
          client_secret: process.env.FOURSQUARE_CLIENT_SECRET,
          v: 20191117
        }
      }
    )
    res.send(data)
  } catch (error) {
    next(error)
  }
})
