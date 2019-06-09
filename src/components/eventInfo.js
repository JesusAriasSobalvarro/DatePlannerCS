import React, { Component } from 'react';

class EventInfo extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <p>{this.props.event_info.event_description}</p>
      </div>
    );
  }
}

export default EventInfo