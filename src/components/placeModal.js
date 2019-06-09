import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal'
import '../App.css'
import URL from '../constants/constants'

class PlaceModal extends Component {

  constructor({ modal_visible }) {
    super()
    this.state = {
      'modal_visible': modal_visible,
      'place_id': -1,
      'place_name': '',
      'place_description': '',
      'place_address': '',
      'place_picture': {}
    }
  }

  componentWillReceiveProps({ modal_visible, id_place }) {
    if (id_place !== -1) {
      var request = new Request(URL + 'places/pictures/' + id_place, {
        method: 'GET'
      })
      fetch(request)
        .then(res => res.json())
        .then(json => {
          const restaurants = Array.from(json)
          if (restaurants.length !== 0) {
            this.setState({
              'place_name': restaurants[0].places_table.place_name,
              'place_description': restaurants[0].places_table.description,
              'place_address': restaurants[0].places_table.address,
              'place_picture': json
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.setState({
        'modal_visible': modal_visible,
        'place_id': id_place
      })
    }
  }

  render() {

    const restaurants = Array.from(this.state.place_picture)
    const listRestaurants = restaurants.map((restaurant, index) =>
      <Image key={index} src={restaurant.picture_url} className="Modal-picture" ></Image>)

    return (
      <Modal show={this.state.modal_visible} onHide={this.props.handle_modal_close} dialogClassName="width50">
        <Modal.Header closeButton>
          <Modal.Title>{this.state.place_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Addres:</Modal.Body>
        <Modal.Body>{this.state.place_address}</Modal.Body>
        <Modal.Body>Description:</Modal.Body>
        <Modal.Body>{this.state.place_description}</Modal.Body>
        <Modal.Footer>
          <div className="Modal-pictures-container"> {listRestaurants}</div>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default PlaceModal;
