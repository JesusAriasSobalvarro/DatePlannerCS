import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserPicker from './components/userPicker';
import EventContainer from './components/eventContainer';
import NewDate from './components/newDate';

class App extends Component {

  constructor () {
    super()
    this.state = {
      'users_list' : {},
      'events_list' : {},
      'restaurants_list' : {}
    }
    
    this.requestEventsForUsers = this.requestEventsForUsers.bind(this)
    this.requestRestaurantList = this.requestRestaurantList.bind(this)
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

  render() {
      var arr = this.state.events_list
      var elements=[];
        for(var i=0;i<arr.length;i++){
             // push the component to elements!
            var event = arr[i]
            var place = arr[i].places_table
            console.log(place)
            console.log(place.place_name)
            elements.push(<EventContainer key={event.id_event} event_description={event.event_description} 
            event_date={event.time_of_event} event_place={place.place_name} event_name={event.event_name} ></EventContainer>);
        }


    return (
      
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <UserPicker users_list={this.state.users_list} requestEvents={this.requestEventsForUsers} />
        <NewDate restaurants_list={this.state.restaurants_list} requestRestaurantList={this.requestRestaurantList}/>
        <div className="Event-container">
        {elements}
        </div>      
        
        <p>Hola</p>
      
        
      </div>

    );
  }
}

export default App;
