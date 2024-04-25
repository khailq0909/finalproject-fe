import React from 'react';
import { faClock, faSmokingBan, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OurPolicy() {
  return (
    <div id='policy' className="policy mt-5 mb-5">
    <h3 className="text-black">
        Our Policy
    </h3>
    <div className="row">
        <div className="col col-4 ps-3 max-height bg-light rounded-start-3">
            <p className='text-black fw-bold fs-3 p-3'>Accommodation Policy & General Information</p>
        </div>
        <div className="col max-height col-8 p-4 border rounded-end-3 ">
            <div className="time_policy d-flex border border-top-0 border-end-0 border-start-0 border-bottom-1 pb-3 border-dark">
                <div className="check_icon">
                    <FontAwesomeIcon icon={faClock} className='fs-3 text-dark' />
                </div>
                <div className="check_time ms-3">
                    <p className='text-black fw-bold'>Check-in/Check-out Time</p>
                    <div className="time d-flex ">
                        <div>Check-in: <span className='fw-bold text-black'>From 7:00 AM</span></div>
                        <div className='ms-5'>Check-out: <span className='fw-bold text-black'>Before 7:00 PM</span></div>
                    </div>
                </div>
            </div>

            <div className="time_policy d-flex border border-top-0 border-end-0 border-start-0 border-bottom-1 pb-3 border-dark mt-3">
                <div className="check_icon">
                    <FontAwesomeIcon icon={faSmokingBan} className='fs-3 text-danger' />
                </div>
                <div className="check_time ms-3">
                    <p className='text-black fw-bold'>Smoking</p>
                    <p className='text-black'>Smoking is allowed only in the designated smoking area.</p>
                </div>
            </div>

            <div className="time_policy d-flex pb-3 border-dark mt-3">
                <div className="check_icon">
                    <FontAwesomeIcon icon={faBan} className='fs-3 text-danger' />
                </div>
                <div className="check_time ms-3">
                    <p className='text-black fw-bold'>Banned substances</p>
                    <p className='text-black'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad alias cum iure unde tempora earum quae recusandae corporis. Cumque enim, sapiente cupiditate voluptatibus labore veniam nobis? Officia sint eum sequi dicta nulla, nemo quibusdam vitae similique voluptatibus at sit impedit assumenda adipisci modi. Incidunt suscipit, reprehenderit labore laboriosam magnam voluptas?</p>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default OurPolicy