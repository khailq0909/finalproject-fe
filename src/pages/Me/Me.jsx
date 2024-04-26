import React from 'react'
import "./style.css"
import axios from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query'
import { AuthContext } from "../../context/AuthContext";
import Header from '../../components/Header/Header';

function Me() {
    const { user } = useContext(AuthContext);
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
                                                <input type="text" className="form-control" placeholder={data.firstname} aria-label="First name" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Last Name *</label>
                                                <input type="text" className="form-control" placeholder={data.lastname} aria-label="Last name" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Birth Day</label>
                                                <input type="text" className="form-control" value={data.birthday} aria-label="Birth Day" />
                                            </div>
                                            <div className="col-md-6">
                                                <label for="inputEmail4" className="form-label">Gender *</label>
                                                <input type="text" className="form-control" id="gender" value={data.gender} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Phone *</label>
                                                <input type="number" className="form-control" placeholder="" aria-label="Phone Number" value={data.phone} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">City</label>
                                                <input type="text" className="form-control" placeholder={data.city} aria-label="ClassName" />
                                            </div>
                                        </div>
                                    </div>



                                    <div className="bg-secondary-soft mt-3 px-4 py-5 rounded">
                                        <div className="row g-3">
                                            <h4 className="my-4">Change Password</h4>

                                            <div className="col-md-6">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Old password *</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" />
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="exampleInputPassword2" className="form-label">New password *</label>
                                                <input type="password" className="form-control" id="exampleInputPassword2" />
                                            </div>

                                            <div className="col-md-12">
                                                <label htmlFor="exampleInputPassword3" className="form-label">Confirm Password *</label>
                                                <input type="password" className="form-control" id="exampleInputPassword3" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-4">
                                    <div className="bg-secondary-soft px-4 py-5 rounded">
                                        <div className="row g-3">
                                            <h4 className="mb-4 mt-0">Upload your profile photo</h4>
                                            <div className="text-center">
                                                <div className="square position-relative display-2 mb-3" >
                                                    <img className="fas w-100 h-100 fa-fw fa-user position-absolute top-50 start-50 translate-middle text-secondary" src={data.avatar} alt=""/>
                                                </div>
                                                <input type="file" id="customFile" name="file" />
                                                <label className="btn btn-success-soft btn-block" htmlFor="customFile">Upload</label>
                                                <button type="button" className="btn btn-danger-soft">Remove</button>
                                                <p className="text-muted mt-3 mb-0"><span className="me-1">Note:</span>Minimum size 300px x 300px</p>
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