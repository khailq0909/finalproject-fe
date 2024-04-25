import React from 'react';
import { Link, Outlet } from "react-router-dom"
import "./style.css";
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import adminSidebar from "../../utils/adminSidebar"


function Admin() {
    const { user } = useContext(AuthContext);
    console.log(user)
    return (
        <div className="containe">
            <div class="row">
                <div class="navbars col col-2 position-fixed">
                    <div className="header_left">
                        <div class="cardd">
                            <div class="top-container">
                                <img src="https://i.imgur.com/G1pXs7D.jpg" class="img-fluid profile-image" width="70" />
                                <div class="ml-3">
                                    <h5 class="name">{user?.lastname}</h5>
                                    <p class="mail">{user?.email}</p>
                                </div>
                            </div>
                        </div>
                        <nav className="navbar navbar-light bg-light d-flex mt-5">
                            <div className="">
                                <a className="navbar-brand" href="/">Home</a>
                                <div className="mt-3" id="navbarNav">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            {adminSidebar.map((item) =>{
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
                <div class="col col-10 ms-auto">
                    <Outlet />        
                </div>
            </div>
        </div>
    )
}

export default Admin