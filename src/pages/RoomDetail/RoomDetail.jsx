//import library
import React from 'react';

//import components
import Header from "../../components/Header/Header";
import RoomInfor from '../../form/RoomDetailInfor/RoomInfor';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import './style.css'


function RoomDetail() {
  return (
    <div className="room">
      <Header /> 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav pt-2 pb-2">
                <a className="pe-3 text-black fw-medium fs-6" aria-current="page" href="#overview">Overview</a>
                <a className="pe-3 text-black fw-medium fs-6" aria-current="page" href="#location">Location</a>
                <a className="pe-3 text-black fw-medium fs-6" aria-current="page" href="#facilities">Facilities</a>
                <a className="pe-3 text-black fw-medium fs-6" aria-current="page" href="#policy">Policy</a>
                <a className="pe-3 text-black fw-medium fs-6" aria-current="page" href="#feedback">Feedback</a>
              </div>
            </div>
            <div classNameName="d-flex">
              <a className="pe-3 text-black fw-medium fs-6" aria-current="page" href="!#">Back to top 
              <FontAwesomeIcon icon={faUpLong} classNameName='ps-1'/></a>
            </div>
          </div>
        </nav>
        <RoomInfor/>
      
    </div>

  )
}

export default RoomDetail