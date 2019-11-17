import React from 'react'
import {connect} from 'react-redux'
import GetIdeasButton from './getIdeasButton'

class Events extends React.Component {
  constructor() {
    super()
  }

  render() {
    console.log(`props for events`, this.props)
    return (
      <div>
        {this.props.shortDate && <h2>Viewing {this.props.shortDate}</h2>}
        {this.props.events &&
          this.props.events.map(event => {
            return (
              <div className="event" key={event.id}>
                <p>Summary: {event.summary}</p>
                {event.location ? (
                  <div>
                    <p>Location: {event.location}</p>
                    <GetIdeasButton location={event.location} />
                  </div>
                ) : null}
                {event.start.dateTime ? (
                  <p>
                    Time:{' '}
                    {new Date(event.start.dateTime).toLocaleTimeString('en-US')}{' '}
                    - {new Date(event.end.dateTime).toLocaleTimeString('en-US')}
                  </p>
                ) : (
                  <p> Time: All Day</p>
                )}
              </div>
            )
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
