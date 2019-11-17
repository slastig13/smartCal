import React from 'react'
import {connect} from 'react-redux'
import SubCat from './subcats'
import Suggestions from './suggestions'

class Categories extends React.Component {
  constructor() {
    super()
    this.state = {
      category: '',
      subcat: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.subCatClickToggle = this.subCatClickToggle.bind(this)
  }

  handleClick(category) {
    this.setState({category: category})
  }

  subCatClickToggle(subcat) {
    this.setState({subcat: subcat})
  }

  componentWillUnmount() {
    this.setState({category: '', subcat: ''})
  }

  subcategories(category) {
    switch (category) {
      case 'arts':
        return {
          'Bowling Alleys': '4bf58dd8d48988d1e4931735',
          'Movie Theaters': '4bf58dd8d48988d17f941735',
          'Events and Festivals': '4d4b7105d754a06373d81259'
        }
      case 'food':
        return {
          American: '4bf58dd8d48988d14e941735',
          Asian: '4bf58dd8d48988d142941735',
          Bakery: '4bf58dd8d48988d16a941735',
          Coffee: '4bf58dd8d48988d1e0931735',
          Deli: '4bf58dd8d48988d146941735',
          Italian: '4bf58dd8d48988d110941735',
          Mexican: '4bf58dd8d48988d1c1941735',
          Bars: '4bf58dd8d48988d116941735'
        }
      case 'sports':
        return {
          'Basketball Courts': '4bf58dd8d48988d1e1941735',
          'Fitness Centers': '4bf58dd8d48988d175941735',
          Parks: '4bf58dd8d48988d163941735'
        }
      case 'parking':
        return {
          Parking: '4c38df4de52ce0d596b336e1',
          'Gas Stations': '4bf58dd8d48988d113951735'
        }
    }
  }

  render() {
    return (
      <div className="miniWindow">
        <p>What are you looking for?</p>
        <button
          className="category"
          onClick={() => this.handleClick('arts')}
          type="button"
        >
          Arts and Entertainment
        </button>
        <button
          className="category"
          onClick={() => this.handleClick('food')}
          type="button"
        >
          Food and Drink
        </button>
        <button
          className="category"
          onClick={() => this.handleClick('sports')}
          type="button"
        >
          Outdoors and Athletics
        </button>
        <button
          className="category"
          onClick={() => this.handleClick('parking')}
          type="button"
        >
          Parking and Gas
        </button>
        <p>
          {this.state.category &&
            this.state.category.length > 1 &&
            Object.entries(this.subcategories(this.state.category)).map(
              subcat => {
                return (
                  <SubCat
                    key={subcat[0]}
                    subcat={subcat[0]}
                    catId={subcat[1]}
                    location={this.props.location}
                    clickedToggle={subcat => this.subCatClickToggle(subcat)}
                  />
                )
              }
            )}
        </p>
        <p>
          {this.state.subcat &&
            this.state.subcat.length > 1 && (
              <div>
                Here are some {this.state.subcat} suggestions nearby!
                <Suggestions />
              </div>
            )}
        </p>
      </div>
    )
  }
}

export default connect(null)(Categories)
