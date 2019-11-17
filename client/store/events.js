import axios from 'axios'

let GET_DATE = 'GET_DATE'

let getDateEvents = events => {
  return {
    type: GET_DATE,
    events
  }
}

export const getDateEventsThunk = dateDetails => {
  return async dispatch => {
    try {
      let {data} = await axios.get('/api/calendar', {
        params: {
          timeMin: dateDetails.timeMin,
          timeMax: dateDetails.timeMax
        }
      })
      dispatch(getDateEvents(data.items))
    } catch (error) {
      console.error(error)
    }
  }
}

const eventReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DATE:
      return action.events
    default:
      return state
  }
}

export default eventReducer
