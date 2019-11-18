import React from 'react'
import {connect} from 'react-redux'

class Suggestions extends React.Component {
  render() {
    console.log(`venues`, this.props.venues)
    return (
      <div>
        {this.props.venues && this.props.venues.length > 0 ? (
          this.props.venues.map(venue => {
            return (
              <div className="suggestion" key={venue.id}>
                {venue.location.address && (
                  <div>
                    <p>Name: {venue.name}</p>
                    <p>Address: {venue.location.address}</p>
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <div> Sorry, we don't have any suggestions right now.</div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    venues: state.venues
  }
}

export default connect(mapState)(Suggestions)
