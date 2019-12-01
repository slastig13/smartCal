import axios from 'axios'

const GET_VENUES = 'GET_VENUES'

const getVenues = venues => {
  return {
    type: GET_VENUES,
    venues
  }
}

export const getVenuesThunk = venueSearchDetails => {
  return async dispatch => {
    try {
      let {data} = await axios.get('/api/foursquare/search', {
        params: {
          near: venueSearchDetails.near,
          categoryId: venueSearchDetails.categoryId
        }
      })
      dispatch(getVenues(data.response.venues))
    } catch (error) {
      console.error(error)
    }
  }
}

const venueReducer = (state = [], action) => {
  switch (action.type) {
    case GET_VENUES:
      return action.venues
    default:
      return state
  }
}

export default venueReducer
