import React, { useState, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
import banner from "../assets/images/homeowner.jpeg";
import * as Loading from "../common/Loader/Loader";
import axios from 'axios';
import Swal from 'sweetalert2'



function OwnerRegister() {
    const { user } = useContext(AuthContext);
    const [imagePreview, setImagePreview] = useState([]);
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        companyname: undefined,
        bussinessCode: undefined,
        identificationCard: undefined,
        companytimeRegister: undefined,
        cardImg: undefined,
        fileName: undefined,
    })
    console.log(user)
    const navigate = useNavigate();
    const onFilesChange = async (e) => {
        setIsLoading(true);
        let images = [];
        let filePaths = [];
        const files = e.target.files;
        for (let i of files) {
            const formData = new FormData();
            formData.append('file', i);
            formData.append("upload_preset", "ml_default");
            try {
                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/denvpjdpw/image/upload",
                    formData
                );
                if (uploadRes.status === 200) {
                    images.push(uploadRes.data?.secure_url);
                    filePaths.push(uploadRes.data?.public_id);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
        setIsLoading(false);
        setImagePreview(prev => [...prev, ...images,]);
        setCredentials(prev => {
            const newImageUrls = Array.isArray(prev.imageUrls) ? prev.imageUrls : [];
            const newFileNames = Array.isArray(prev.fileName) ? prev.fileName : [];
            return {
                ...prev,
                cardImg: [...newImageUrls, ...images], fileName: [...newFileNames, ...filePaths]
            };
        });
    }

    function handleDeleteImage(image) {
        setImagePreview(prev => prev?.filter(item => item !== image));
    }
    const handleChange = (e) => {
        e.preventDefault()
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleSubmit = () => {
        axios.put(`https://finalproject-api.onrender.com/api/users/${user?._id}`, {
            ...credentials,
            requestHomeOwner: true
        }).then(() => {
            const email = {
                email: user?.email,
                subject: "Request partnership confirmed",
                html: `
                <h1>Dear ${user?.lastname}</h1>
                <p>Your request partnership is comfirmed please waite for our respone</p>
                <p>Best regard.</p>
                `
            }
            axios.post(`https://finalproject-api.onrender.com/api/emails/sendEmail`, email)

            const emailtoAdmin = {
                email: user?.email,
                subject: "New Home Owner Register Request",
                html: `
                <p>A new Home owner request please check now</p>
                <p>Best regard.</p>
                `
            }
            axios.post(`https://finalproject-api.onrender.com/api/emails/sendEmail`, emailtoAdmin)

            Swal.fire({
                title: 'Congratulations!',
                text: 'Your request partnership is success please waite until admin accept your request l!!!',
                icon: 'success',
                timer: 5000,
                timerProgressBar: true,
                allowOutsideClick: false,
                willClose: () => {
                    navigate('/')
                }
            })
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>

            <div className="header bg-light w-100">
                <div className='container'>
                    <div className="logo">
                        <div className="navbar-brand fs-4 pt-2 pb-2 text-black fw-semibold">
                            <Link to="/" className="navbar-brand ">myhomestay.com</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hero h-500 position-relative">
                <div className="card border-0 w-100 text-white h-500">
                    <img src={banner} className="card-img h-100 rounded-0" alt="..." />
                    <div className="card-img-overlay container mt-5 w-75">
                        <h5 className="card-title text-black w-25 fw-bold fs-2">Partner with VietNam’s Leading Travel Platform</h5>
                        <p className="card-text text-black w-50 mt-4">With more than 50 million monthly active users in Asia-Pacific and beyond, Traveloka is here to support the growth of your business. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nesciunt delectus, repellendus eos inventore tenetur a. Obcaecati, incidunt consequuntur. Impedit?   </p>
                        <p className="card-text text-black w-50">Choose the partnership that best suit your needs from the various options below. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, qui.</p>
                    </div>
                </div>
            </div>
            <div className="text-center w-100 position-absolute start-0 end-0 top-50 bg-white rounded-top-5">
                <div className="container">

                    <h1 className='fw-semibold text-black mt-4'>Join with us for best sale palce</h1>
                    <div className="row  overflow-hidden d-flex justify-content-center mt-4 mb-5">
                        <div className="col-10 rounded-4 bg-light p-3">
                            {
                                user && user.requestHomeOwner === true ? <h1 className='text-black fw-semibold'>Your request has been sent to us, please waite until receive our response</h1> :
                                    <>
                                        <h3 className="fw-semibold">
                                            Home Owner Register
                                        </h3>
                                        <div className="row gy-3 gy-md-4 mt-1">
                                            <div className="col-6">
                                                <input type="text" className="form-control" id="companyname" placeholder="Company Name" onChange={handleChange} required />
                                            </div>
                                            <div className="col-6">
                                                <input type="text" className="form-control" id="companytimeRegister" placeholder="Register for the first time" onChange={handleChange} required />
                                            </div>
                                            <div className="col-6">
                                                <input type="number" className="form-control" id="bussinessCode" placeholder="Bussines Code" onChange={handleChange} required />
                                            </div>
                                            <div className="col-6">
                                                <input type="number" className="form-control" id="identificationCard" placeholder="Citizen identification card/ Passport" onChange={handleChange} required />
                                            </div>
                                            <div className="col-12">
                                                <div className="cards w-100">
                                                    <div className="top">
                                                        <p>Upload a photo of your ID card and business registration</p>
                                                    </div>
                                                    <div className="drag-area" onClick={() => fileInputRef.current.click()}>
                                                        {
                                                            isLoading ? Loading.LoadingUpload() :
                                                                <span >Drop & drag here</span>
                                                        }
                                                        <input id="imageUrls" type="file" name='imageUrls' className='file'
                                                            accept='image/*' multiple onChange={onFilesChange} ref={fileInputRef} />
                                                    </div>
                                                    <div className="containers">
                                                        {
                                                            imagePreview?.map((item, index) => {
                                                                return (
                                                                    <div className="div" key={index}>
                                                                        <div className="image" >
                                                                            <span className="delete" onClick={() => handleDeleteImage(item)}>&times;</span>
                                                                            <img src={item} alt={""} />
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className="image_preview">
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-danger pt-2 pb-2 ps-5 pe-5" onClick={handleSubmit}>
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OwnerRegister