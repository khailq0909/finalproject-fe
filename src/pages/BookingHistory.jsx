import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import useFetch from '../hooks/useFetch';
import moment from 'moment';
import axios from 'axios';
import * as Toast from "../common/Toast/Toast"


function BookingHistory() {
  const [value, onChange] = useState(new Date());
  const [booked, setBooked] = useState([])
  const { data } = useFetch(`https://finalproject-api.onrender.com/api/bookings/by-user`);
  useEffect(() => {
    axios.get(`https://finalproject-api.onrender.com/api/bookings/by-user`).then((data)=>{
      console.log("booking: ",data)
    }).catch(err=> console.log(err))
  }, [])
  useEffect(() => {
    setBooked(data?.filter(r => r.bookingstatus === "Completed"));
  }, [data])
  console.log(data)
  const handleCancel = (booking) => {
    const confirm = window.confirm('Are you sure you want to cancel');
    if (confirm) {
      axios.put(`https://finalproject-api.onrender.com/api/bookings/cancle/${booking?._id}`).then(() => {
        Toast.toastSuccess("Booking cancelled")
        setTimeout(() => {
          window.location.reload();
        }, 3000)
        const email = {
          email: booking?.bookerInfo,
          subject: "Booking cancelled",
          html: `
          <h1>Your booking at ${booking?.roomname} has been cancelled</h1>
          <p>Please give us your feedback for our services</p>
          <p>Best regard.</p>
          `
        }
        axios.post(`https://finalproject-api.onrender.com/api/emails/sendEmail`,email)
      }).catch(err => {
        Toast.toastError("Something went wrong");
        console.log(err)
      })
    }
  }
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col col-8 p-2">
            <h3 className='text-black fw-semibold'>My Booking</h3>
            {
              booked && booked?.map((item, index) => {
                return (
                  <div class="card mb-3 mt-3 border-dark-subtle height">
                    <div class="row g-0">
                      <div class="col-md-4 mb-1">
                        <img src={item.room?.imageUrls[Math.floor(Math.random() * 8)]} class="img-fluid rounded-start height" alt="..." />
                      </div>
                      <div class="col-md-8 container">
                        <div class="card-body">
                          <div className="d-flex justify-content-between">
                            <div className=" d-flex">
                              <h5 class="card-title me-3">{item.room?.name}</h5>
                              {[...Array(5)].map((_, index) => {
                                return (
                                  <span key={index}
                                    className={`${index + 1 <= item.room?.rating ? "text-warning" : ""} fs-6`}
                                  >&#9733;</span>
                                )
                              })}
                            </div>
                            <div className="booking_code">
                              <div className="fw-bolder fs-5">{item?.bookingcode}</div>
                            </div>
                          </div>
                          <div className="text-black fs-6 border border-top-0 border-start-0 border-end-0 pb-2">
                            {item.room?.address}
                          </div>
                          <div className="row p-3">
                            <div className="col col-9">
                              <div className="start_date mb-1">
                                <span className='fw-semibold'>Check-In: </span>
                                {moment(item.checkin).format('MMMM Do YYYY')} 7:00 AM
                              </div>
                              <div className="end_date mb-1">
                                <span className='fw-semibold'>Check-Out: </span>
                                {moment(item.checkout).format('MMMM Do YYYY')} 7:00 PM
                              </div>
                            </div>
                            <div className="col col-3 ">
                              <span className='me-2'>Total day:</span>
                              <span className='fw-bolder'>{item?.totalday} day(s)</span>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="total_cost">
                              <span className='fw-bolder fs-4'>Cost: <span className='text-danger'>{item?.totalcost}$</span> </span>
                            </div>
                            <div className=" float-end btn btn-danger pt-2 pb-2 ps-5 pe-5 ms-5" onClick={e => handleCancel(item)}>
                              Cancel
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="col col-4 p-2">
            <h3 className="text-black fw-semibold mb-3">
              Calendar
            </h3>
            <Calendar className="w-100" onChange={onChange} value={value} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingHistory