import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';

function PlaceList() {
    const {userId} = useParams()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(userId);
    const dummy_places = [
        {
          "uid": "101",
          "pid": 1,
          "name": "City Park",
          "location": "123 Main Street, Cityville",
          "image": "https://via.placeholder.com/300",
          "coordinates": {
            "latitude": 40.7128,
            "longitude": -74.0060
          }
        },
        {
          "uid": "101",
          "pid": 2,
          "name": "Ocean View Restaurant",
          "location": "456 Beach Blvd, Coastal City",
          "image": "https://via.placeholder.com/300",
          "coordinates": {
            "latitude": 34.0522,
            "longitude": -118.2437
          }
        },
        {
          "uid": "102",
          "pid": 3,
          "name": "Mountain Retreat",
          "location": "789 Summit Avenue, Mountain Town",
          "image": "https://via.placeholder.com/300",
          "coordinates": {
            "latitude": 39.5501,
            "longitude": -105.7821
          }
        },
        {
          "uid": "102",
          "pid": 4,
          "name": "Museum of Art",
          "location": "101 Cultural Street, Art City",
          "image": "https://via.placeholder.com/300",
          "coordinates": {
            "latitude": 41.8781,
            "longitude": -87.6298
          }
        },
        {
          "uid": "103",
          "pid": 5,
          "name": "Historic Square",
          "location": "555 Heritage Lane, Old Town",
          "image": "https://via.placeholder.com/300",
          "coordinates": {
            "latitude": 37.7749,
            "longitude": -122.4194
          }
        }
      ];
      
  return (
    <div className='d-flex justify-content-center align-items-center'>
        {
            dummy_places.filter(item=>item.uid===userId)?.map(item=>(
                <div className='card d-flex justify-conter-center align-items-center m-5 p-3 w-25' >
                    <img src={item.image} width={200} alt="" />
                    <h4 className='text-center mt-5'>{item.name}</h4>
                    <h4 className='text-center'>{item.location}</h4>
                    <div>
                        <button className='btn btn-success mt-3' onClick={handleShow}>View on Map</button>
                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                            <Modal.Title>{item.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            I will not close if you click outside me. Do not even try to press
                            escape key.
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default PlaceList