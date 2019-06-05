import React, { Component } from 'react';
import Datetime from 'react-datetime';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button'
import './newDate.css';

class NewDate extends Component {

  componentDidMount() {
    console.log('Component new Date Mounted')
    this.props.requestRestaurantList()
  }
  
  render() {

    const  restaurants = Array.from (this.props.restaurants_list)
    const listRestaurants = restaurants.map((restaurant) =>
   <div className="New-date-place-container">
    <Image src={restaurant.picture_url} className="New-date-place-picture"></Image>
    <p>{restaurant.place_name}</p>
    </div>
  
 
  )

    return (
      


      <div className="New-date-container">
      <div className="card New-date-card">
      <div className="New-date-label-and-input">
      <label className="New-date-label">
            Name:
      </label>
      <input className="form-control New-date-input" type="text"></input>
      </div>

      <div className="New-date-label-and-input">
      <label className="New-date-label">
            Description:
      </label>
      <input className="form-control New-date-input" type="text"></input>
      </div>

      <div className="New-date-label-and-input">
      <label className="New-date-label">
            Date and Time:
      </label>
      <Datetime className="New-date-input" />
      </div>

      <div className="New-date-label-and-input">
      <label className="New-date-label">
            Place:
      </label>
      <section className="New-date-places-container">
      {listRestaurants}
      </section>

      </div>

      <Button>BUTTON</Button>
      
      </div>
      
        
          

      </div>
                
            
      

    );
  }
}

export default NewDate;
