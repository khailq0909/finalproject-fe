import axios from 'axios';
import React from 'react'
import * as Toast from '../../common/Toast/Toast'

function UserDetail(dataUser) {
    const handleApprove = () => {
        const confirm = window.confirm('Are you sure you wannt to approve this request?');
        if (confirm) {
            axios.put(`https://finalproject-api.onrender.com/api/users/${dataUser?.userData?._id}`, {
                isHomeOwner: true,
            }).then(() => {
                const email = {
                    email: dataUser?.userData?.email,
                    subject: "Request partnership confirmed",
                    html: `
                    <h1>Dear ${dataUser?.userData?.lastname}</h1>
                    <p>Your request partnership is <strong>approved</strong></p>
                    <p>Now you can sale your room on our <strong>MyHomeStay.com</strong></p>
                    <p>Best regard.</p>
                    `
                  }
                  axios.post(`https://finalproject-api.onrender.com/api/emails/sendEmail`,email)
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
                Toast.toastSuccess("Approve request successfully")
            }).catch(err => console.log(err))
        }
    }
    return (
        <div>
            <div id='userDetail' className="modal fade" tabindex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            {dataUser?.userData?.requestHomeOwner === true ? <h5 className="modal-title">Request Detail</h5> : <h5 className='modal-title'>User Detail</h5>}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row gy-3 gy-md-4 overflow-hidden">
                                {
                                    dataUser.userData?.requestHomeOwner === true &&
                                    <div className="col-12">
                                        <label for="firstname" className="form-label">Identification Card</label>
                                        <input type="text" className="form-control" id="firstname" value={dataUser?.userData?.identificationCard} readOnly required />
                                    </div>
                                }
                                <div className="col-6">
                                    <label for="firstname" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="firstname" value={dataUser?.userData?.firstname} readOnly required />
                                </div>
                                <div className="col-6">
                                    <label for="firstname" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="firstname" value={dataUser?.userData?.lastname} readOnly required />
                                </div>
                                <div className="col-6">
                                    <label for="firstname" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="firstname" value={dataUser?.userData?.email} readOnly required />
                                </div>
                                <div className="col-6">
                                    <label for="firstname" className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" id="firstname" value={dataUser?.userData?.phone} readOnly required />
                                </div>
                                {
                                    dataUser.userData?.requestHomeOwner === true &&
                                    <>
                                        <div className="col-6">
                                            <label for="firstname" className="form-label">Company Name</label>
                                            <input type="text" className="form-control" id="firstname" value={dataUser?.userData?.companyname} readOnly required />
                                        </div>
                                        <div className="col-6">
                                            <label for="firstname" className="form-label">Bussiness Code</label>
                                            <input type="text" className="form-control" id="firstname" value={dataUser?.userData?.bussinessCode} readOnly required />
                                        </div>
                                        <div className="col-12">
                                            <label for="firstname" className="form-label">Document Images</label>
                                            <div className="image_document d-flex">
                                                {dataUser?.userData?.cardImg?.map((img) => {
                                                    return (
                                                        <img src={img} className="img-fluid w-50 p-1" alt='' />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        {dataUser?.userData?.requestHomeOwner === true && dataUser?.userData?.isHomeOwner === false ?
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={handleApprove}>Approve</button>
                            </div> :
                            <div className="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetail