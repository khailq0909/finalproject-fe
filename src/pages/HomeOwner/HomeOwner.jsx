import React from 'react';
import { Link, Outlet } from "react-router-dom"
import "./style.css";
import manageSidebar from "../../utils/manageSidebar"
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";


function HomeOwner() {
    const { user } = useContext(AuthContext);

    return (
        <div className="containe">
            <div className="row">
                <div className="navbars col col-2 position-fixed">
                    <div className="header_left">
                        <div className="cardd">
                            <div className="top-container">
                                <img src="https://i.imgur.com/G1pXs7D.jpg" className="img-fluid profile-image" width="70" alt='' />
                                <div className="ml-3">
                                    <h5 className="name">{user.lastname}</h5>
                                    <p className="mail">{user.email}</p>
                                </div>
                            </div>

                            <div className="balance border border-3 rounded-2 border-danger p-2 mt-3">
                                    <div className="fw-bolder fs-5 text-black">Balance: <span className='text-danger'>{user?.balance}</span>$</div>
                                </div>
                        </div>
                        <nav className="navbar navbar-light bg-light d-flex mt-3">
                            <div className="">
                                <a className="navbar-brand" href="/">Home</a>
                                <div className="mt-3" id="navbarNav">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            {manageSidebar.map((item) =>{
                                                return(
                                                    <Link key={item.id} className="nav-link" to={item?.path}>{item.text}</Link>
                                                )
                                            })
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="col col-10 ms-auto">
                    <Outlet />        
                </div>
            </div>
        </div>
    )
}

export default HomeOwner