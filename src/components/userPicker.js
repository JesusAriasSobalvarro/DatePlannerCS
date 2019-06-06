import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

class UserPicker extends Component {
  constructor() {
    super()
    this.state = {
      "selected_user" : "SELECT YOUR USER"
    }
  }

  select_user(username, id) {
    this.setState({
      "selected_user" : username
    })

    this.props.requestEvents(id)   
  }

  render() {
    const  users = Array.from (this.props.users_list)
    const listItems = users.map((user) =>
    
    <Dropdown.Item key={user.id_user} onClick={() => this.select_user(user.first_name + " " + user.last_name, user.id_user)}>
      {user.first_name + " " + user.last_name}
    </Dropdown.Item>
    
);
    return (
      <div>
        <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">{this.state.selected_user}</Dropdown.Toggle>

  <Dropdown.Menu>
    {listItems}
  </Dropdown.Menu>
</Dropdown>
      </div>
      
    );
  }
}

export default UserPicker