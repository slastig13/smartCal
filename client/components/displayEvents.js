import React from 'react'
import {connect} from 'react-redux'
import SingleEvent from './singleEvent'

class Events extends React.Component {
  render() {
    return (
      <div>
        {this.props.shortDate && <h2>Viewing {this.props.shortDate}</h2>}
        {this.props.events &&
          this.props.events.map(event => {
            if (event.summary !== 'Pill') {
              return <SingleEvent key={event.id} {...event} />
            }
          })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    events: state.events,
    shortDate: state.shortDate
  }
}

export default connect(mapState)(Events)
