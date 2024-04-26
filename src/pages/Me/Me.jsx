import React from 'react'
import "./style.css"
import axios from 'axios';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query'
import { AuthContext } from "../../context/AuthContext";
import Header from '../../components/Header/Header';
import * as Toast from "../../common/Toast/Toast"
import moment from "moment"

function Me() {
    const { user, dispatch } = useContext(AuthContext);
    const [errors, setErrors] = useState({})
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmPass, setConfirmPass] = useState()
    const [credentials, setCredentials] = useState({
        username: '',
        firstname: '',
        lastname: '',
        phone: '',
    });
    // const [userData, setUserData] = useState();

    const { data, error, isError, isLoading } = useQuery(['user'], getUser)
    if (isLoading) {
        return <span>Đang tải...</span>
    }

    if (isError) {
        return <span>Have an errors: {error.message}</span>
    }
    async function getUser() {
        const response = await axios.get(`https://finalproject-api.onrender.com/api/users/${user._id}`);
        return response.data;
    }

    if (data == null) return <> </>

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setErrors({ ...errors, [e.target.id]: "" });
    };
    const handleUpdateProfile = () => {
        const validationError = {};
        const regexPhone = /^(?:\+?84|0)(?:\d{9,10})$/
        const regexSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
        if (!credentials.username.trim()) {
            validationError.username = "Username is required, please enter"
        } else if (credentials.username.length < 10 || credentials.username.length > 30) {
            validationError.username = "Username must be between 10 and 30 characters"
        }
        if (!credentials.firstname.trim()) {
            validationError.firstname = "First name is required, please enter"
        } else if (regexSpecial.test(credentials.firstname)) {
            validationError.firstname = "First name cannot contain special characters"
        }

        if (!credentials.lastname.trim()) {
            validationError.lastname = "Last name is required, please enter"
        } else if (regexSpecial.test(credentials.lastname)) {
            validationError.lastname = "Last name cannot contain special characters"
        }

        if (!credentials.phone.trim()) {
            validationError.phone = "Phone Number is required, please enter"
        }
        else if (!regexPhone.test(credentials.phone)) {
            validationError.phone = "Phone Number is invalid, please enter"
        }
        setErrors(validationError);

        const conf = window.confirm("Are you sure you want to update your profile?");
        if (conf) {
            if (Object.keys(validationError).length === 0) {
                try {
                    axios.put(`https://finalproject-api.onrender.com/api/users/${user._id}`, { ...credentials }).then((data) => {
                        Toast.toastSuccess("Update successfully")
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000)
                    }).catch((err) => console.log(err))

                } catch (err) {
                    console.log("Error " + err.response.data);
                }
            }
        }

    }

    const handleChangePassword = () => {
        axios.post(`https://finalproject-api.onrender.com/api/auth/checkPassword`, {
            email: user.email,
            oldPass: oldPassword,
            newPass: newPassword,
            confirmPass: confirmPass
        }).then((data) => {
            Toast.toastSuccess(data.data.message)
            setTimeout(() => {
                window.location.reload();
            }, 3000)
            const email = {
                email: user?.email,
                subject: "Your Password has been changed",
                html: `
                <h1>Dear ${user?.lastname}</h1>
                <p>Your Password has been changed at ${moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p>Best regard.</p>
                `
            }
            axios.post(`/emails/sendEmail`, email)
        }).catch(err => {
            console.log(err?.response.data.message)
        })
    }

    return (
        <div className="profile">
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="my-5">
                            <h3>My Profile</h3>
                            <hr />
                        </div>
                        <form className="file-upload">
                            <div className="row">
                                <div className="col col-8 mb-xxl-0">
                                    <div className="bg-secondary-soft px-4 py-5 rounded">
                                        <div className="row g-3">
                                            <h4 className="mb-4 mt-0">Contact detail</h4>
                                            <div className="col-md-6">
                                                <label className="form-label">First Name *</label>
                                                <input id='firstname' type="text" className="form-control" placeholder={data?.firstname} aria-label="First name" onChange={handleChange} />
                                                {errors.firstname && <span className="text-danger">{errors.firstname}</span>}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Last Name *</label>
                                                <input id='lastname' type="text" className="form-control" placeholder={data?.lastname} aria-label="Last name" onChange={handleChange} />
                                                {errors.lastname && <span className="text-danger">{errors.lastname}</span>}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Email</label>
                                                <input type="text" className="form-control" placeholder={data?.email} readOnly unselectable='true' aria-label="Birth Day" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">UserName</label>
                                                <input id='username' type="text" className="form-control" placeholder={data?.username} aria-label="Birth Day" onChange={handleChange} />
                                                {errors.username && <span className="text-danger">{errors.username}</span>}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Phone *</label>
                                                <input id='phone' type="number" className="form-control" placeholder={data?.phone} aria-label="Phone Number" onChange={handleChange} />
                                                {errors.phone && <span className="text-danger">{errors.phone}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn btn-success p-3 mt-3 rounded-2 mb-5 w-100" onClick={handleUpdateProfile}>
                                        Update Profile
                                    </div>
                                </div>
                                <div className="col col-4">

                                    <div className="bg-secondary-soft ms-2 px-4 py-5 rounded">
                                        <div className="row g-3">
                                            <h4 className="my-4">Change Password</h4>

                                            <div className="col-md-6">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Old password *</label>
                                                <input type="password" className="form-control" id="oldPassword" onChange={e => setOldPassword(e.target.value)} />
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="exampleInputPassword2" className="form-label" >New password *</label>
                                                <input type="password" className="form-control" id="newPassword" onChange={e => setNewPassword(e.target.value)} />
                                            </div>

                                            <div className="col-md-12">
                                                <label htmlFor="exampleInputPassword3" className="form-label">Confirm new password *</label>
                                                <input type="password" className="form-control" id="confirmPass" onChange={e => setConfirmPass(e.target.value)} />
                                            </div>
                                            <div className="btn btn-success" onClick={handleChangePassword}>
                                                Change Password
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div>

    )
}

export default Me