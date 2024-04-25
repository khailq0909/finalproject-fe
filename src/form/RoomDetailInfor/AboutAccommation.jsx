import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
function AboutAccommation() {
  return (
    <div className="row d-flex justify-content-between align-items-between p-3 mt-3">
    <div className="col-4 accommodation p-3 bg-light rounded-4">
        <div className="accommodation__header d-flex justify-content-between align-items-center">
            <h3 className='text-black'>About Accommodation</h3>
            <span className='btn btn-primary'>See more </span>
        </div>
        <div className="accommodation__body text-black mt-2">
            <p>Ha Noi Le Grand Hotel is located in area / city Bach Dang Ward. 24-hours front desk is available to serve you, from check-in to check-out, or any assistance you need. Should you desire more, do</p>
        </div>
    </div>
    <div className="col-8 p-0 ps-3">
        <div className="area p-3 bg-light rounded-4 h-100">
            <div className="area_header d-flex justify-content-between align-items-center">
                <h3 className='text-black'>In the Area</h3>
                <span className='btn btn-primary'>See map</span>
            </div>
            <div className="area_body d-flex flex-wrap w-100 justify-content-between align-content-between">
                <div className="text-black item w-50 p-2">
                    <FontAwesomeIcon icon={faLocationDot} className='pe-2'></FontAwesomeIcon> Near recreation spot

                </div>
                <div className="text-black item w-50 p-2">
                    <FontAwesomeIcon icon={faLocationDot} className='pe-2'></FontAwesomeIcon> St. Joseph's Cathedral
                </div>
                <div className="text-black item w-50 p-2">
                    <FontAwesomeIcon icon={faLocationDot} className='pe-2'></FontAwesomeIcon> Hai Ba Trung Shrine
                </div>
                <div className="text-black item w-50 p-2">
                    <FontAwesomeIcon icon={faLocationDot} className='pe-2'></FontAwesomeIcon> Vietnam Soviet Friendship Hospital
                </div>
                <div className="text-black item w-50 p-2">
                    <FontAwesomeIcon icon={faLocationDot} className='pe-2'></FontAwesomeIcon> Hanoi Railway Station
                </div>
                <div className="text-black item w-50 p-2">
                    <FontAwesomeIcon icon={faLocationDot} className='pe-2'></FontAwesomeIcon> Lake of the Restored Sword
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default AboutAccommation