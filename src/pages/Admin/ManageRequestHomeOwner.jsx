import React, { useEffect, useState } from 'react';
import useFecth from '../../hooks/useFetch'
import noData from "../../assets/images/noData.png";
import UserDetail from '../../form/UserDetail/UserDetail';

function ManageRequestHomeOwner() {
    const [userHomeOwnerReq, setUserHomeOwnerReq] = useState([]);
    const [userData, setUserData] = useState();
    const { data} = useFecth(`/users`);

    useEffect(() => {
        setUserHomeOwnerReq(data.filter(user => user.requestHomeOwner === true))
    }, [data])

    if (userHomeOwnerReq == null) <></>

    return (
        <div className="manage_user container">
            <div className="manage_header d-flex justify-content-center align-items-center mt-3 me-2">
                <h2>Manage HomeOwner</h2>
            </div>
            <div className="line"></div>
            {userHomeOwnerReq.length !== 0 ? <div className=''>
                <div className="topic_table">
                    <table className="table align-middle mb-0 bg-white table-bordered mt-5">
                        <thead className="bg-light ">
                            <tr>
                                <th className='fs-6 text text-center fw-bold'>No</th>
                                <th className='fs-6 text text-center fw-bold'>Email</th>
                                <th className='fs-6 text text-center fw-bold'>First Name</th>
                                <th className='fs-6 text text-center fw-bold'>Last Name</th>
                                <th className='fs-6 text text-center fw-bold'>Phone</th>
                                <th className='fs-6 text text-center fw-bold'>Company Name</th>
                                <th className='fs-6 text text-center fw-bold'>Bussiness Code</th>
                                <th className='fs-6 text text-center fw-bold'>Identify Card</th>
                                <th className='fs-6 text text-center fw-bold'>Status</th>
                                <th className='fs-6 text text-center fw-bold'>Action</th>
                            </tr>
                        </thead>
                        {
                            userHomeOwnerReq.map((item, index) => {
                                return (
                                    <tbody key={index}>
                                        <tr >
                                            <td>{index + 1}</td>
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
                                                    {item.companyname}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    {item.bussinessCode}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    {item.identificationCard}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    {item.isHomeOwner === true ? <div className='btn btn-outline-success'>Approved</div>:<div className='btn btn-outline-warning'>Pending</div> }
                                                </div>
                                            </td>
                                            <td className='topic_action'>
                                                <button type="button" className="btn btn-success btn-sm btn-rounded" data-bs-toggle="modal" data-bs-target="#userDetail" onClick={e => setUserData(item)}>
                                                    Show Detail
                                                </button>
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
            <UserDetail userData={userData}/>
        </div>
    )
}

export default ManageRequestHomeOwner