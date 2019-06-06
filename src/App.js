import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserPicker from './components/userPicker';
import EventContainer from './components/eventContainer';
import NewDate from './components/newDate';
import PlaceModal from './components/placeModal';

class App extends Component {

  constructor () {
    super()
    this.state = {
      'users_list' : {},
      'events_list' : {},
      'restaurants_list' : {},
      'modal_visible' : false,
      'modal_id_place' : -1
    }
    
    this.requestEventsForUsers = this.requestEventsForUsers.bind(this)
    this.requestRestaurantList = this.requestRestaurantList.bind(this)
    this.handleModalOpen = this.handleModalOpen.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
  }

  componentDidMount() {
    var request = new Request('http://localhost:5000/', {
      method : 'GET'
    })
    fetch(request)
    .then(res => res.json())
    .then(json => {
      var users_list = json
      console.log( users_list)
      this.setState({
        'users_list' : users_list
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  requestEventsForUsers(id) {
    var request = new Request('http://localhost:5000/events/'+id, {
      method : 'GET'
    })
    fetch(request)
    .then(res => res.json())
    .then(json => {
    
      console.log(json)
      
      
      this.setState({
        'events_list' : json 
      })

      console.log(this.state)
      
    })
    .catch(err => {
      console.log(err)
    })
  }

  requestRestaurantList() {
    var request = new Request('http://localhost:5000/places/', {
      method : 'GET'
    })
    fetch(request)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
        'restaurants_list' : json
      })
    })
  }

  handleModalOpen(e) {
    console.log(e)
    console.log('Modal Was Opened')
    this.setState({
      'modal_visible' : true,
      'modal_id_place' : e
    })
  }

  handleModalClose() {
    this.setState({
      'modal_visible' : false,
      'modal_id_place' : -1
    })
  }

  render() {
      var arr = this.state.events_list
      var elements=[];
      console.log(arr.le)
      if (arr.length === undefined || arr.length === 0) {
        elements.push(<p key={0}>No dates available.</p>)
      } else {
        for(var i=0;i<arr.length;i++){
          // push the component to elements!
         var event = arr[i]
         var place = arr[i].places_table
         console.log(place)
         console.log(place.place_name)
         elements.push(<EventContainer key={event.id_event} event_description={event.event_description} 
         event_date={event.time_of_event} event_place={place.place_name} event_name={event.event_name} ></EventContainer>);
     }
      }



    return (
      
      <div className="App">

        <UserPicker users_list={this.state.users_list} requestEvents={this.requestEventsForUsers} />
        <h3 className="Title">Plan A Date:</h3>
        <NewDate restaurants_list={this.state.restaurants_list} requestRestaurantList={this.requestRestaurantList} open_place_modal={this.handleModalOpen} />
        <div className="Event-container">
        <h3>Upcomming dates:</h3>
        <div className="Event-card-container">{elements}</div>
        </div>      
        
       
      <PlaceModal modal_visible={this.state.modal_visible} id_place={this.state.modal_id_place}
      handle_modal_close={this.handleModalClose} ></PlaceModal>
        
      </div>

    );
  }
}

export default App;
