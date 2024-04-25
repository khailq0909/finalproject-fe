import React from 'react'
import slide1 from "../assets/images/slide1.jpg";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'



function Register() {

    const navigate = useNavigate();
    const [confirmPass, setConfirmPass] = useState("");
    const [errors, setErrors] = useState({});
    const [credentials, setCredentials] = useState({
        email: '',
        username: '',
        firstname: '',
        password: '',
        lastname: '',
        phone: '',
    });
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setErrors({...errors, [e.target.id]: "" });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = {};
        const regexPhone = /^(?:\+?84|0)(?:\d{9,10})$/
        const regexSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!credentials.email.trim()) {
            validationError.email = "Email is required, please enter"
        } else if (!regexEmail.test(credentials.email)) {
            validationError.email = "Email is not valid"
        }
        if (!credentials.username.trim()) {
            validationError.username = "Username is required, please enter"
        } else if (credentials.username.length < 10 || credentials.username.length > 30) {
            validationError.username = "Username must be between 10 and 30 characters"
        }
        if (credentials.password < 6 || credentials.password > 20) {
            validationError.password = "Username must be between 6 and 20 characters"
        } else if (!credentials.password.trim()) {
            validationError.password = "Password is required, please enter"
        } else if (credentials.password !== confirmPass) {
            validationError.password = "Password confirm not match"
            setConfirmPass("")
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
        if (Object.keys(validationError).length === 0) {
            try {
                    const res = await axios.post("/auth/register", { ...credentials});
                    const data = res.data;
                    console.log(data);
                    Swal.fire({
                        title: 'Congratulations!',
                        text: 'We have send you a verification link to your email address. Please check your email!!!',
                        icon: 'success',
                        timer: 5000,
                        timerProgressBar: true,
                        allowOutsideClick: false,
                        willClose: () => {
                            navigate('/login')
                        }
                    })
            } catch (err) {
                console.log("Error " + err.response.data);
            }
        }
    };

    return (
        <form className="p-3 p-md-4 p-xl-5 ">
            <div className="container">
                <div className="card border-light-subtle shadow-sm" style={{ borderRadius: "1rem" }}>
                    <div className="row g-0">
                        <div className="col-12 col-md-6">
                            <img className="img-fluid w-100 h-100 object-fit-cover" loading="lazy" src={slide1} style={{ borderRadius: "1rem 0 0 1rem" }} alt="BootstrapBrain Logo" />
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-5">
                                            <h2 className="h1 fw-bold mb-0">Registration</h2>
                                            <h3 className="fs-6 fw-normal text-dark-subtle m-0">Enter your details to register</h3>
                                        </div>
                                    </div>
                                </div>
                                <form action="#!">
                                    <div className="row gy-3 gy-md-4 overflow-hidden">
                                        <div className="col-6">
                                            <label for="firstname" className="form-label">First Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="firstname" placeholder="First Name" onChange={handleChange}  />
                                            {errors.firstname && <span className="text-danger">{errors.firstname}</span>}
                                        </div>
                                        <div className="col-6   ">
                                            <label for="lastname" className="form-label">Last Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="lastname" placeholder="Last Name" onChange={handleChange}  />
                                            {errors.lastname && <span className="text-danger">{errors.lastname}</span>}

                                        </div>
                                        <div className="col-12">
                                            <label for="email" className="form-label">Email <span className="text-danger">*</span></label>
                                            <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={handleChange}  />
                                            {errors.email && <span className="text-danger">{errors.email}</span>}

                                        </div>

                                        <div className="col-6">
                                            <label for="username" className="form-label">Username <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="username" placeholder='Username' onChange={handleChange}  />
                                            {errors.username && <span className="text-danger">{errors.username}</span>}
                                        
                                        </div>

                                        <div className="col-6">
                                            <label for="phone" className="form-label">Phone <span className="text-danger">*</span></label>
                                            <input type="tel" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxLength="12" className="form-control" name="phone" id="phone" placeholder='Number Phone' onChange={handleChange}  />
                                            {errors.phone && <span className="text-danger">{errors.phone}</span>}
                                        </div>
                                        <div className="col-6">
                                            <label for="password" className="form-label">Password <span className="text-danger">*</span></label>
                                            <input type="password" className="form-control" id="password" placeholder='Password' onChange={handleChange} />
                                            {errors.password && <span className="text-danger">{errors.password}</span>}
                                        </div>
                                        <div className="col-6">
                                            <label for="passwordConfirm" className="form-label">Confirm Password <span className="text-danger">*</span></label>
                                            <input type="password" className="form-control" id="passwordConfirm" placeholder="Password Confirm" onChange={e => setConfirmPass(e.target.value)}  />
                                        </div>

                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" name="iAgree" id="iAgree"  />
                                                <label className="form-check-label text-black" for="iAgree">
                                                    I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button className="btn bsb-btn-xl btn-primary" type="submit" onClick={handleSubmit} >Sign up</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col-12">
                                        <hr className="mt-5 mb-4 border-secondary-subtle" />
                                        <p className="m-0 text-center" style={{ color: "#393f81" }}  >Already have an account? <Link to={'/login'} className='text-primary'>Sign in</Link></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Register