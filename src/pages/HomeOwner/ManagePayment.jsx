import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import * as Toast from '../../common/Toast/Toast'
import axios from 'axios';
import moment from 'moment';
import BookingDetail from '../../components/BookingDetail';

function ManagePayment() {
    const [bookingDetail, setbookingDetail] = useState({});
    const { data } = useFetch('/bookings/by-homeowner')
    const handleClickDelete = (bookingId) => {
        const confirmed = window.confirm("Are you sure you want to delete?");
        if (confirmed) {
            axios.delete(`/bookings/${bookingId}`).then(data => {
                Toast.toastSuccess("Deleted");
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
            }).catch(err => {
                Toast.toastError("Something went wrong");
            })
        }
    }
    return (
        <>
            <div className='container'>
                <h1 className='text-center text-black fw-bold mt-2'>Manage Payment</h1>
                <table className="table table-striped mt-5">
                    <thead>
                        <tr>
                            <th scope="col" className='text-black fw-semibold text-center'>No.</th>
                            <th scope="col" className='text-black fw-semibold text-center'>Booker</th>
                            <th scope="col" className='text-black fw-semibold text-center'>Room Id</th>
                            <th scope="col" className='text-black fw-semibold text-center'>Checkin - Checkout</th>
                            <th scope="col" className='text-black fw-semibold text-center'>Day(s)</th>
                            <th scope="col" className='text-black fw-semibold text-center'>Cost</th>
                            <th scope="col" className='text-black fw-semibold text-center'>Booking Code</th>
                            <th scope="col" className='text-black fw-semibold text-center'>Create At</th>
                            <th scope="col" className='text-black fw-semibold text-center'>Status</th>
                            <th scope="col" className='text-black fw-semibold text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='text-center text-black fw-bold'>{index + 1}</td>
                                        <td className='text-center'>{item.bookerInfo}</td>
                                        <td className='text-center'>{item.roomId}</td>
                                        <td className='text-center'>{moment(item.checkin).format('DD-MM-YYYY')} <span className="text-black fw-bold">to</span> {moment(item.checkout).format('DD-MM-YYYY')}</td>
                                        <td className='text-center'>{item.totalday}</td>
                                        <td className='text-center'>{item.totalcost} $</td>
                                        <td className='text-center'>{item.bookingcode}</td>
                                        <td className='text-center'>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                                        {item.bookingstatus === "Completed"
                                            ?
                                            <td className='text-center'><div className="bg-success-subtle p-2 rounded-1">{item.bookingstatus}</div></td>
                                            :
                                            <td className='text-center'><div className="bg-danger-subtle p-2 rounded-1">{item.bookingstatus}</div></td>
                                        }
                                        <td className='text-center' colSpan={2}>
                                            <div className="btn btn-outline-primary me-1" data-bs-toggle="modal" data-bs-target="#bookingDetail"
                                                onClick={() => {
                                                    setbookingDetail(item)
                                                }}
                                            >Detail</div>
                                            <div className="btn btn-outline-danger ms-1" onClick={e => handleClickDelete(item?._id)}>Delete</div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <BookingDetail booking={bookingDetail} />
        </>
    )
}

export default ManagePayment