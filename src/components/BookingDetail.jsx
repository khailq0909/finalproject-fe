import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import moment from 'moment';
import axios from 'axios';

function BookingDetail(booking) {
    const [roomData, setRoomData] = useState();
    const { data } = useFetch(`/users/${booking.booking?.bookingby}`)
    useEffect(() => {
        axios.get(`/rooms/find/${booking.booking?.roomId}`).then(data => setRoomData(data.data)).catch(err => console.log(err))
    }, [booking])
    return (
        <div>
            <div className="modal" id="bookingDetail" tableindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-black" id="exampleModalLabel">Booking Detail</h5>
                            <button type="button" className="btn-close text-black fw-semibold" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row container">
                                <div className="col col-8 pe-2">
                                    <h3 className='text-black fw-semibold'>Room Info</h3>
                                    <div className="row">
                                        <div className="col-8">
                                            <label for="inputAddress2" className="form-label">Room Name</label>
                                            <input readOnly type="text" className="form-control" id="inputAddress2" value={roomData?.name} />
                                        </div>
                                        <div className="col-4">
                                            <label for="inputAddress2" className="form-label">Room Type</label>
                                            <input readOnly type="text" className="form-control" id="inputAddress2" value={roomData?.type} />
                                        </div>
                                        <div className="col-12">
                                            <label for="inputAddress2" className="form-label"></label>
                                            <input readOnly type="text" className="form-control" id="inputAddress2" value={roomData?.address} />
                                        </div>
                                        <div className="col-6">
                                            <label for="inputAddress2" className="form-label">Room Price/Nights</label>
                                            <input readOnly type="text" className="form-control" id="inputAddress2" value={roomData?.pricePerNight} />
                                        </div>
                                    </div>
                                    <h3 className='text-black fw-semibold'>Booking Info</h3>
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <label for="inputAddress2" className="form-label">Booking ID</label>
                                            <input readOnly type="text" className="form-control" id="inputAddress2" value={booking.booking?._id} />
                                        </div>
                                        <div className="col-6">
                                            <label for="inputAddress2" className="form-label">Created At</label>
                                            <input readOnly type="text" className="form-control" id="inputAddress2" value={moment(booking.booking?.createdAt).format('MMMM Do YYYY, h:mm:ss a')} />
                                        </div>
                                        <div className="col-6">
                                            <label for="inputAddress2" className="form-label">Start Date</label>
                                            <input readOnly type="text" className="form-control" id="inputAddress2" value={moment(booking.booking?.checkin).format('DD-MM-YYYY, h:mm:ss a')} />
                                        </div>
                                        <div className="col-6">
                                            <label for="inputAddress2" className="form-label">End Date</label>
                                            <input readOnly type="text" className="form-control" id="inputAddress2" value={moment(booking.booking?.checkout).format('DD-MM-YYYY, h:mm:ss a')} />
                                        </div>
                                        <div className="col-6">
                                            <label for="inputAddress2" className="form-label">Total Day</label>
                                            <input readOnly type="text" className="form-control" id="inputAddress2" value={booking.booking?.totalday} />
                                        </div>
                                        <div className="col-6">
                                            <label for="inputAddress2" className="form-label">Total Cost</label>
                                            <input readOnly type="text" className="form-control" id="inputAddress2" value={booking.booking?.totalcost} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-4 ps-2">
                                    <h3 className="text-black fw-semibold">Booker Contact</h3>
                                    <form className="row g-3">
                                        <div className="col-md-12">
                                            <label for="inputEmail4" className="form-label">First Name</label>
                                            <input readOnly type="text" className="form-control" id="inputEmail4" value={data?.firstname} />
                                        </div>
                                        <div className="col-md-12">
                                            <label for="inputPassword4" className="form-label">Last Name</label>
                                            <input readOnly type="text" className="form-control" id="inputPassword4" value={data?.lastname} />
                                        </div>
                                        <div className="col-12">
                                            <label for="inputAddress" className="form-label">Email</label>
                                            <input readOnly type="text" className="form-control" id="inputAddress" value={data?.email} />
                                        </div>
                                        <div className="col-12">
                                            <label for="inputAddress2" className="form-label">Phone</label>
                                            <input readOnly type="text" className="form-control" id="inputAddress2" value={`+` + data?.phone} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BookingDetail