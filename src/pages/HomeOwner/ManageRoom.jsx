import React, { useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import noData from "../../assets/images/noData.png";
import * as Toast from "../../common/Toast/Toast";
import EditRoom from './EditRoom';
import useFetch from '../../hooks/useFetch';

function ManageRoom() {
  const { user } = useContext(AuthContext);
  const [dataEdit, setdataEdit] = useState([]);
  const { data } = useFetch(`/rooms/list`)
  if (data == null) <></>
  function handleClickDelete(id) {
    const conf = window.confirm("Are you sure you want to delete?");
    try {
      if (conf) {
        axios.delete(`/rooms/${id}`);
        console.log("delete successfully")
        Toast.toastSuccess("Deleted");
        setTimeout(() => {
          window.location.reload();
        }, 3000)
      }
    } catch (err) {
      Toast.toastError("Something went wrong");
      console.log(err);
    }
  }
  return (
    <>
      <div className="manage_room container">
        <div className="manage_header d-flex justify-content-center align-items-center mt-3 me-2">
          <h2>Manage Room</h2>
        </div>
        <div className="line"></div>
        {data.length !== 0 ? <div className=''>
          <div className="topic_table">
            <table className="table mb-0 bg-white table-bordered mt-5">
              <thead className="bg-light ">
                <tr className="text-center">
                  <th className='fs-6 text-black fw-bold'>No</th>
                  <th className='fs-6 text-black fw-bold '>Room Name</th>
                  <th className='fs-6 text-black fw-bold '>Type</th>
                  <th className='fs-6 text-black fw-bold '>Address</th>
                  <th className='fs-6 text-black fw-bold '>City</th>
                  <th className='fs-6 text-black fw-bold '>Adult</th>
                  <th className='fs-6 text-black fw-bold '>Child</th>
                  <th className='fs-6 text-black fw-bold '>Price</th>
                  <th className='fs-6 text-black fw-bold '>Action</th>

                </tr>
              </thead>

              <tbody >
                {
                  data?.map((item, index) => {
                    return (
                      <tr key={index} >
                        <td className='fw-bolder'>{index + 1}</td>
                        <td className='topic_tile'>
                          <div className="d-flex align-items-center">
                            {item?.name}
                          </div>
                        </td>
                        <td className='topic_startdate'>
                          <div className="d-flex align-items-center">
                            {item?.type}
                          </div>
                        </td>
                        <td className='topic_enddate'>
                          <div className="d-flex align-items-center">
                            {item?.address}
                          </div>
                        </td>
                        <td className='topic_description'>
                          <div className="d-flex align-items-center">
                            {item?.city}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {item?.adultCount}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {item?.childCount}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {item?.pricePerNight}
                          </div>
                        </td>

                        <td className='topic_action d-flex w-100 justify-content-center align-content-center'>
                          <button type="button" className="btn btn-success-soft btn-sm btn-rounded w-50 p-2 me-2" data-bs-toggle="modal"
                            data-bs-target="#createAccount"
                            onClick={() => {
                              setdataEdit(item)
                            }}>

                            {" "}
                            Edit
                          </button>
                          <button type="button" className="btn btn-danger-soft btn-sm btn-rounded w-50 p-2" onClick={e => handleClickDelete(item?._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    )

                  })
                }
              </tbody>
            </table>
          </div>
        </div> : <div className='container d-flex justify-content-center mt-5'>
          <img className='w-50' src={noData} alt="noData" />
        </div>}
      </div>
      <EditRoom dataEdit={dataEdit} />
    </>
  )
}

export default ManageRoom