import React, { Component } from 'react';
import Datetime from 'react-datetime';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button'
import './newDate.css';

class NewDate extends Component {

  constructor() {
    super()
    this.state = {
      'id_place': -1,
      'event_name': '',
      'event_description': '',
      'event_date_time': ''
    }
  }

  componentDidMount() {
    this.props.requestRestaurantList()
  }

  placeClicked(id_place, e) {
    e.preventDefault()
    if (e.target === e.currentTarget) {
      this.setState({
        'id_place': id_place
      })
    }
  }

  setDate(moment) {
    console.log("DATE SET")
    var date = ''

    if (moment !== undefined) {
      date = moment._d
    } else {
      date = ''
    }

    this.setState({
      'event_date_time': date
    })
  }

  submitDate() {

    var isDate = false
    var date = Date.parse(this.state.event_date_time);
    if (isNaN(date))
      isDate = false
    else
      isDate = true

    if ((this.state.id_place !== -1) && (this.state.event_name !== '') && (this.state.event_description !== '') && isDate) {
      this.props.addUserEvent(this.state)
    }

    this.setState({
      'id_place': -1,
      'event_name': '',
      'event_description': '',
      'event_date_time': ''
    })
  }

  handleModalOpened(place_id) {
    this.setState({
      'id_place': -1
    })
    this.props.open_place_modal(place_id)
  }

  render() {
    
    const restaurants = Array.from(this.props.restaurants_list)
    const listRestaurants = restaurants.map((restaurant) =>
      <div key={restaurant.id_place} className={"New-date-place-container" + (this.state.id_place === restaurant.id_place ? "-selected" : "")} onClick={(e) => this.placeClicked(restaurant.id_place, e)}>
        <Image src={restaurant.picture_url} className="New-date-place-picture"></Image>
        <p className="New-date-place-name">{restaurant.place_name}</p>
        <Button variant="outline-info" onClick={() => this.handleModalOpened(restaurant.id_place)} >Info</Button>
      </div> )

    return (
      <div className="New-date-container">
        <div className="New-date-card">
          <div className="New-date-label-and-input">
            <label className="New-date-label">
              Name:
      </label>
            <input className="form-control New-date-input" type="text"
              onChange={e => { this.setState({ 'event_name': e.target.value }) }}
              value={this.state.event_name}></input>
          </div>

          <div className="New-date-label-and-input">
            <label className="New-date-label">
              Description:
      </label>
            <input className="form-control New-date-input" type="text"
              onChange={e => { this.setState({ 'event_description': e.target.value }) }}
              value={this.state.event_description}></input>
          </div>
          <div className="New-date-label-and-input">
            <label className="New-date-label">
              Date and Time:
      </label>
            <Datetime className="New-date-input" onChange={e => { this.setDate(e) }}
              value={this.state.event_date_time}></Datetime>
          </div>
          <div className="New-date-label-and-input">
            <label className="New-date-label">
              Place:
      </label>
            <section className="New-date-places-container">
              {listRestaurants}
            </section>
          </div>
          <Button onClick={() => this.submitDate()}> + Create New Date</Button>
        </div>
      </div>
    );
  }
}

export default NewDate;
