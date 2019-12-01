import React from 'react'
import {connect} from 'react-redux'
import GetIdeasButton from './getIdeasButton'
import Categories from './categories'

class SingleEvent extends React.Component {
  constructor() {
    super()
    this.state = {
      toggle: false
    }
    this.toggleCategories = this.toggleCategories.bind(this)
  }

  toggleCategories() {
    this.setState({toggle: !this.state.toggle})
  }

  render() {
    return (
      <div className="event">
        <p>Summary: {this.props.summary}</p>
        {this.props.location ? (
          <div>
            <p>Location: {this.props.location}</p>
            <GetIdeasButton toggle={() => this.toggleCategories()} />
          </div>
        ) : null}
        {this.props.start.dateTime ? (
          <p>
            Time:{' '}
            {new Date(this.props.start.dateTime).toLocaleTimeString('en-US')} -{' '}
            {new Date(this.props.end.dateTime).toLocaleTimeString('en-US')}
          </p>
        ) : (
          <p> Time: All Day</p>
        )}
        {this.state.toggle === true && (
          <div>
            <Categories location={this.props.location} />
            <button type="button" className="x" onClick={this.toggleCategories}>
              X
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default connect(null)(SingleEvent)
