import './style.css'
import React from 'react';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Dropdown from 'react-bootstrap/Dropdown';
function Header() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { loading, dispatch } = useContext(AuthContext);
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
        try {
            const res = await axios.post("https://finalproject-api.onrender.com/api/auth/logout");
            dispatch({ type: "LOGOUT_SUCCESS", payload: res.data.details });
            localStorage.removeItem("user");
            navigate("/");
        } catch (err) {
            dispatch({ type: "LOGOUT_FAILURE", payload: err.response.data });
        }
    };
    return (
        <div className='header'>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-xl">
                    <Link to="/" className="navbar-brand fs-4 fw-semibold ">myhomestay.com</Link>
                    <div className="d-flex">
                        <Link className='btn btn-hover me-2' to='/support'>Support</Link>
                        {user && user.isHomeOwner !== true ?  <Link className='btn btn-hover me-2' to='/owner-register'>Partnership</Link> : <></>}
                        {user ? <div>
                            <Dropdown>
                                <Dropdown.Toggle className='btn btn-light border border-primary' id="dropdown-basic">
                                    <FontAwesomeIcon icon={faUser} className='pe-2 text-primary'></FontAwesomeIcon>
                                    {user.username}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        user && user.isHomeOwner === true && <Dropdown.Item><Link className="text-black text-decoration-none" to={"/homeowner-home"}><div>Manage</div></Link></Dropdown.Item>
                                    }
                                    {
                                        user && user.isAdmin === true && <Dropdown.Item><Link className="text-black text-decoration-none" to={"/admin-home"}><div>Admin</div></Link></Dropdown.Item>
                                    }
                                    <Dropdown.Item><Link className="text-black text-decoration-none" to={"/me"}><div>Profile</div></Link></Dropdown.Item>
                                    <Dropdown.Item><Link className="text-black text-decoration-none" to={"/booking-history"}><div>My Booking</div></Link></Dropdown.Item>
                                    <Dropdown.Item disabled={loading} onClick={handleClick} >Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown></div> : (
                            <><Link className='btn btn-light border border-primary me-2 ' to='/login'>
                                <FontAwesomeIcon icon={faUser} className='pe-2 text-primary'></FontAwesomeIcon>
                                Login</Link><Link className='btn btn-primary p-2' to='/register'>Register</Link></>
                        )}


                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header