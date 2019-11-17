import React from 'react'
import {connect} from 'react-redux'
import {getVenuesThunk} from '../store/venues'
import parseAddress from 'parse-address-string'

class SubCats extends React.Component {
  constructor() {
    super()
    this.state = {
      zipcode: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    parseAddress(this.props.location, (err, addressObj) => {
      this.setState({
        zipcode: addressObj.postal_code
      })
    })
  }

  handleClick(venueSearchDetails) {
    this.props.getVenues(venueSearchDetails)
    this.props.clickedToggle(venueSearchDetails.subcat)
  }

  render() {
    return (
      <div>
        <button
          className="subcat"
          type="button"
          onClick={() =>
            this.handleClick({
              near: this.state.zipcode,
              categoryId: this.props.catId,
              subcat: this.props.subcat
            })
          }
        >
          {this.props.subcat}
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    getVenues: venueSearchDetails =>
      dispatch(getVenuesThunk(venueSearchDetails))
  }
}

export default connect(null, mapDispatch)(SubCats)
