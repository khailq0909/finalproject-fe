import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Toast from "../../common/Toast/Toast"

import noData from "../../assets/images/noData.png";
import UserDetail from '../../form/UserDetail/UserDetail';


function ManageHomeOwner() {
  const [userData, setuserData] = useState([])
  const [userDetail, setUserDetail] = useState();
  const [userHomeOwner, setUserHomeOwner] = useState([]);
  useEffect(() => {
    axios.get(`https://finalproject-api.onrender.com/api/users`)
      .then((data) => {
        setuserData(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  const handleBanAccount = (id) => {
    const confirm = window.confirm('Are you sure you wannt to ban this account?');
    if (confirm) {
      axios.put(`https://finalproject-api.onrender.com/api/users/${id}`, {
        isActive: false,
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 3000)
        Toast.toastSuccess("Ban account successfully")
      }).catch(err => console.log(err))
    }
  }
  const handleUnBanAccount = (id) => {
    const confirm = window.confirm('Are you sure you wannt to ban this account?');
    if (confirm) {
      axios.put(`https://finalproject-api.onrender.com/api/users/${id}`, {
        isActive: true,
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 3000)
        Toast.toastSuccess("Un Ban account successfully")
      }).catch(err => console.log(err))
    }
  }

  useEffect(() => {
    setUserHomeOwner(userData.filter(user => user.isHomeOwner === true && user.isAdmin === false))
  }, [userData])




  if (userData == null) <></>
  return (
    <div className="manage_user container">
      <div className="manage_header d-flex justify-content-center align-items-center mt-3 me-2">
        <h2>Manage HomeOwner</h2>
      </div>
      <div className="line"></div>
      {userData.length !== 0 ? <div className=''>
        <div className="topic_table">
          <table className="table align-middle mb-0 bg-white table-bordered mt-5">
            <thead className="bg-light ">
              <tr>
                <th className='fs-6 text fw-bold text-center'>No</th>
                <th className='fs-6 text fw-bold text-center'>User Name</th>
                <th className='fs-6 text fw-bold text-center'>Email</th>
                <th className='fs-6 text fw-bold text-center'>First Name</th>
                <th className='fs-6 text fw-bold text-center'>Last Name</th>
                <th className='fs-6 text fw-bold text-center'>Phone</th>
                <th className='fs-6 text fw-bold text-center'>Status</th>
                <th className='fs-6 text fw-bold text-center'>Action</th>

              </tr>
            </thead>
            {
              userHomeOwner.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr >
                      <td>{index + 1}</td>
                      <td className='topic_tile'>
                        <div className="d-flex align-items-center">
                          {item.username}
                        </div>
                      </td>
                      <td className='topic_startdate'>
                        <div className="d-flex align-items-center">
                          {item.email}
                        </div>
                      </td>
                      <td className='topic_enddate'>
                        <div className="d-flex align-items-center">
                          {item.firstname}
                        </div>
                      </td>
                      <td className='topic_description'>
                        <div className="d-flex align-items-center">
                          {item.lastname}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          {item.phone}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          {item.isActive === true ? <div className='btn btn-primary'>active</div> : <div className='btn btn-warning'>baned</div>}
                        </div>
                      </td>

                      <td className='topic_action d-flex justify-content-around'>
                        <button type="button" className="btn btn-success btn-rounded" data-bs-toggle="modal" data-bs-target="#userDetail" onClick={e => setUserDetail(item)}>
                          Show Detail
                        </button>
                        {item.isActive === true ?
                          <button type="button" className="btn btn-danger btn-rounded" onClick={() => handleBanAccount(item?._id)}>
                            Ban this account
                          </button> :
                          <button type="button" className="btn btn-primary btn-rounded" onClick={() => handleUnBanAccount(item?._id)}>
                            Unban this account
                          </button>
                        }
                      </td>
                    </tr>
                  </tbody>
                )
              })
            }
          </table>
        </div>
      </div> : <div className='container d-flex justify-content-center mt-5'>
        <img className='w-50' src={noData} alt="noData" />
      </div>}
      <UserDetail userData={userDetail} />
    </div>
  )
}

export default ManageHomeOwner