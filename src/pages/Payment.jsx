import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Paypal from '../config/Paypal';
import moment from 'moment';
import Header from "../components/Header/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import Congrate from '../common/Congrate/Congrate';


function Payment() {
    const location = useLocation();
    const [bookingData, setBookingData] = useState(location.state?.bookingDetails);
    const [isSuccess, setIsSuccess] = useState(false)
    return (
        <>
            <Header />
            {isSuccess && <Congrate />}
            <div className="container mt-5">
                <div className="row d-flex justify-content-center ">
                    <div className="col col-8 bg-light rounded-3 me-2 box-shadow">

                    <p className='text-white fw-semibold text-center w-100 bg-color-primary rounded-top-3 pt-3 pb-3'>
                            We’re holding this price for you! Let’s complete your payment in 00:27:50
                        </p>
                        <div className="room_info p-2">
                            <div className="room_title d-flex justify-content-between align-items-center">
                                <div className='fs-5 fw-semibold text-black'>{bookingData?.room?.name}</div>
                                <span>
                                    {[...Array(5)].map((_, index) => {
                                        return (
                                            <span key={index}
                                                className={`${index + 1 <= bookingData?.room?.rating ? "text-warning" : ""} fs-5`}
                                            >&#9733;</span>
                                        )
                                    })}
                                </span>
                            </div>
                            <div className="fs-12 mt-1"><FontAwesomeIcon icon={faMapMarker} className='me-2' />{bookingData?.room?.address}</div>
                            <div className="room_image mt-3">
                                <img src={bookingData?.room?.imageUrls[Math.floor(Math.random() * 8)]} className='w-100 h-200 p-0 rounded-2' alt="" />
                            </div>
                            <div className="time w-100 d-flex justify-content-between mt-4 align-items-center">
                                <div className="check_in d-flex flex-wrap bg-white justify-content-center rounded-3 p-2 border">
                                    <div className='text-black fs-12'>Check-in</div>
                                    <div className='text-black fs-12 fw-bold'>{moment(bookingData?.checkin).format('MMMM Do YYYY')}</div>
                                    <div className='fs-12'>From 7:00 AM</div>
                                </div>
                                <div className="duration p-2">
                                    <h3 className='border-bottom border-black fs-10 d-flex text-black'><span className='me-1 text-black fw-bold'>{bookingData?.totalday === 0 ? bookingData?.totalday + 1 : bookingData?.totalday}</span> day(s)</h3>
                                </div>
                                <div className="check_in d-flex flex-wrap bg-white justify-content-center rounded-3 p-2 border">
                                    <div className='text-black fs-12'>Check-out</div>
                                    <div className='text-black fs-12 fw-bold'>{moment(bookingData?.checkout).format('MMMM Do YYYY')}</div>
                                    <div className='fs-12'>Before 7:00 AM</div>
                                </div>
                            </div>
                        </div>
                        <div className="payment_body p-3">
                            <div className="total_price">
                                <div className='fs-1 fw-semibold text-black mb-5'>Total Price:
                                    <span className='fs-1 fw-semibold text-danger mt-5'>{bookingData?.totalcost}$</span>
                                </div>
                            </div>
                            <Paypal setIsSuccess={setIsSuccess} payload={bookingData} amount={bookingData?.totalcost} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment