import React from 'react'
import {connect} from 'react-redux'
import {getDateEventsThunk} from '../store/events'
import DisplayEvents from './displayEvents'
import {shortDate} from '../store/shortDate'

class DateDropDown extends React.Component {
  constructor() {
    super()
    this.state = {
      date: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({date: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    // console.log(`this is my state date`, this.state.date)
    // let endDate = new Date(this.state.date)
    // endDate.setHours(23, 59, 59, 999)

    let dateDetails = {
      timeMin: new Date(`${this.state.date} 00:00`).toISOString(),
      timeMax: new Date(`${this.state.date} 23:59:59`).toISOString()
    }
    // console.log(`date details`, dateDetails)
    this.props.shortDate(this.state.date)
    this.props.getEvents(dateDetails)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            View date:
            <input
              type="date"
              onChange={this.handleChange}
              value={this.state.date}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <DisplayEvents />
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    getEvents: dateDetails => dispatch(getDateEventsThunk(dateDetails)),
    shortDate: date => dispatch(shortDate(date))
  }
}

export default connect(null, mapDispatch)(DateDropDown)
