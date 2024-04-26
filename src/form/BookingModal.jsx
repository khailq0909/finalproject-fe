import React, { useContext,useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from '../context/SearchContext';
import moment from 'moment';

function BookingModal({ user, roomData}) {
    const {dates} = useContext(SearchContext)
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(moment(dates[0]?.startDate).format('DD-MM-YYYY'))
    const [endDate, setEndDate] = useState(moment(dates[0]?.endDate).format('DD-MM-YYYY'))
    
    const toltalDate = moment.duration(moment(endDate, 'DD-MM-YYYY').diff(moment(startDate,'DD-MM-YYYY')))
    const totalDays = toltalDate.asDays() === 0? toltalDate.asDays() + 1 : toltalDate.asDays();
    const fee = 1.5;

    const totalPrice = (+roomData.pricePerNight * totalDays) + fee;
    const { data } = useFetch(`https://finalproject-api.onrender.com/api/users/${user?._id}`);
    const handlePayment = async() =>{
        const bookingDetails = {
            room: roomData,
            bookingby:data,
            checkin: dates[0]?.startDate,
            checkout: dates[0]?.endDate,
            totalday: totalDays,
            totalcost: totalPrice,
        }
        navigate("/bookings/payment",{replace: true, state: { bookingDetails } })
    }
    return (
        <div>
        <div className="modal fade" id="bookingModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                <div className="modal-content">
                    <div className="d-flex justify-content-between align-items-center p-3 pb-0">
                        <h3 className="modal-title text-black fw-bold" id="staticBackdropLabel">Booking ticket</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="mt-2 p-3 row">
                        <div className="col col-8 ps-3 pe-1">
                            <div className="contact_info bg-light p-3 rounded-3 w-100">
                                <h4 className='text-black fw-bold'>Contact Information</h4>
                                <span>Please fill in all fields correctly to ensure you receive the booking confirmation voucher in your email.</span>
                                <div className="input-group mb-3 d-flex flex-column">
                                    <label htmlFor="basic-url" className="form-label">Contact's name</label>
                                    <input disabled type="text" className="form-control w-100" id="basic-url" aria-describedby="basic-addon3" value={`${data.firstname} ${data.lastname}`} />
                                </div>
                                <div className="contact_by d-flex justify-content-between w-100">
                                    <div className="input-group mb-3 d-flex w-75 pe-2">
                                        <label htmlFor="basic-url" className="form-label">Contact's email address</label>
                                        <input disabled type="text" className="form-control w-100" id="basic-url" aria-describedby="basic-addon3" value={`${data.email}`} />
                                    </div>
                                    <div className="input-group mb-3 d-flex w-75 ps-2">
                                        <label htmlFor="basic-url" className="form-label">Contact's phone</label>
                                        <input disabled type="text" className="form-control w-100" id="basic-url" aria-describedby="basic-addon3" value={`+${data.phone}`} />
                                    </div>
                                </div>
                            </div>
                            <div className="price_detail mt-2 bg-light p-3 rounded-3">
                                <h4 className='text-black fw-bold'>Price details</h4>
                                <div className="room_price d-flex justify-content-between align-items-center">
                                    <p className='text-black'>Room Price</p>
                                    <p className='text-black'>USD <span className='text-danger fw-bold'>{roomData.pricePerNight}</span></p>
                                </div>
                                <div className="room_price d-flex justify-content-between align-items-center">
                                    <p className='text-black'>Taxes and fees</p>
                                    <p className='text-black'>USD <span className='text-danger fw-bold'>{fee}</span></p>
                                </div>
                                <div className="total_price d-flex justify-content-between align-items-center mt-2 border-top border-black">
                                    <p className='mt-3 text-black fw-bold'>Total Price</p>
                                    <p className='mt-3 text-danger fw-bolder'>{totalPrice}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col col-4 ps-1 pe-3 d-flex flex-wrap justify-content-between">
                            <div className="room_info bg-light p-3 rounded-3">
                                <h4 className="text-black fw-bold">Room Info</h4>
                                <div className="room_title d-flex justify-content-between align-items-center">
                                    <div className='fs-5 fw-semibold text-black'>{roomData.name}</div>
                                    <span>
                                        {[...Array(5)].map((_, index) => {
                                            return (
                                                <span key={index}
                                                    className={`${index + 1 <= roomData.rating ? "text-warning" : ""} fs-5`}
                                                >&#9733;</span>
                                            )
                                        })}
                                    </span>
                                </div>
                                <div className="fs-12 mt-1"><FontAwesomeIcon icon={faMapMarker} className='me-2'/>{roomData.address}</div>
                                <div className="room_image mt-3">
                                    <img src={roomData?.imageUrls[Math.floor(Math.random() * 8)]} className='w-100 h-200 p-0 rounded-2' alt="" />
                                </div>
                                <div className="time w-100 d-flex justify-content-between mt-4 align-items-center">
                                    <div className="check_in d-flex flex-wrap bg-white justify-content-center rounded-3 p-2 border">
                                        <div className='text-black fs-12'>Check-in</div>
                                        <div className='text-black fs-12 fw-bold'>{startDate}</div>
                                        <div className='fs-12'>From 7:00 AM</div>
                                    </div>
                                    <div className="duration p-2">
                                        <h3 className='border-bottom border-black fs-10 d-flex text-black'><span className='me-1 text-black fw-bold'>{totalDays === 0? totalDays + 1: totalDays}</span> day(s)</h3>
                                    </div>
                                    <div className="check_in d-flex flex-wrap bg-white justify-content-center rounded-3 p-2 border">
                                        <div className='text-black fs-12'>Check-out</div>
                                        <div className='text-black fs-12 fw-bold'>{endDate}</div>
                                        <div className='fs-12'>Before 7:00 AM</div>
                                    </div>
                                </div>
                            </div>
                        <button type="button" className="btn btn-primary mt-3 w-100" data-bs-dismiss="modal" onClick={handlePayment}  >
                        Continue to Payment
                        </button>
                        </div>
                    </div>
                    <div className="modal-footer mt-3">
                        <button type="button" className="btn btn-secondary mb-2" data-bs-dismiss="modal">Maybe Later</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    )
}

export default BookingModal