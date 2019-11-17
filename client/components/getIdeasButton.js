import React from 'react'
import {connect} from 'react-redux'

class GetIdeasButton extends React.Component {
  render() {
    console.log(`button props`, this.props)
    return (
      <button onClick={this.props.toggle} className="getIdeas" type="button">
        Get Nearby Ideas!
      </button>
    )
  }
}

export default connect(null)(GetIdeasButton)
