import React, { Component } from 'react';

class EventContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'events_list' : {}
    }

  }

  componentDidUpdate(props) {
    console.log(props)
  }



  render() {
  
    return (
      <div className="card">
        <p>{this.props.event_name}</p>
        <p>{this.props.event_description}</p>
        <p>{this.props.event_date}</p>
        <p>{this.props.event_place}</p>
      </div>
      
    );
  }
}

export default EventContainer