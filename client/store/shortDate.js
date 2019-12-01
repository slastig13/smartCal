let SHORT_DATE = 'SHORT_DATE'

export let shortDate = date => {
  return {
    type: SHORT_DATE,
    date
  }
}

let shortDateReducer = (state = '', action) => {
  switch (action.type) {
    case SHORT_DATE:
      return action.date
    default:
      return state
  }
}

export default shortDateReducer
