import React from 'react'
import {connect} from 'react-redux'

class GetIdeasButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.toggle} className="getIdeas" type="button">
        Get Nearby Ideas!
      </button>
    )
  }
}

export default connect(null)(GetIdeasButton)
