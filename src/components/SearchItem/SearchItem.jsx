import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";

function SearchItem({room,dates}) {
  return (
    <div class="card height mb-3">
                <div class="row h-100">
                  <div class="col-md-3">
                    <img src={room.imageUrls[1]} class="img-fluid rounded-start h-100" alt="..." />
                  </div>
                  <div class="col-md-9 h-100 container">
                    <div class="card-body h-100 d-flex flex-wrap justify-content-between align-content-between">
                      <div className="w-100 d-flex justify-content-between align-items-center">
                        <div class="fs-4 fw-semibold">{room.name}</div>
                        <div className="rating">
                            {[...Array(5)].map((_, index)=>{
                            return(
                                <span key={index}
                                className={`${index+1<= room.rating ? "text-warning" : ""} fs-5`}
                                >&#9733;</span>
                            )
                        })}  
                        </div>
                      </div>
                      <div className='location ms-1'><FontAwesomeIcon icon={faMapLocation} role='button' className='fs-5 me-2 text-primary-emphasis'/>{room.address}</div>
                      <div className="card-facilites mt-2">
                          {
                            room.facilities.map((item, index) => {
                              return (
                                <div className="btn btn-light mb-1 me-1">
                                  {item}
                                </div>
                              )
                            })
                          }
                        </div>
                      <div className="card_footer d-flex justify-content-between align-items-between w-100 ">
                        <div className="price fs-5 ms-1">Price per Night: <span className='text-danger fw-bold'>{room.pricePerNight}$</span> </div>
                        <Link className="btn btn-primary" to={`/rooms/${room?._id}`}>Select Room</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  )
}

export default SearchItem