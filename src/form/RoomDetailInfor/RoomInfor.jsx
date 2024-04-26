import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import * as Toast from "../../common/Toast/Toast";
import io from 'socket.io-client';
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import OurPolicy from './OurPolicy';
import Location from './Location';
import AboutAccommation from './AboutAccommation';
import BookingModal from '../BookingModal';
const BASE_URL= process.env.REACT_APP_API_URL
const socket = io('https://finalproject-api.onrender.com', {
    reconnection: true
});

function RoomInfor() {
    console.log(BASE_URL)
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { roomId } = useParams();
    const [roomdata, setRoomdata] = useState();
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState([]);
    const [isComment, setIsComment] = useState(false);
    const [commentsRealTime, setCommentsRealTime] = useState([]);

    useEffect(() => {
        axios.get(`/rooms/find/${roomId}`)
            .then(data => {
                setComments(data.data.comments)
                setRoomdata(data.data);
            })
            .catch(err => console.log(err))
    }, [])

    // add comment
    const addComment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`https://finalproject-api.onrender.com/api/rooms/comment/room/${roomId}`, { rating: rating, comment: comment });
            if (data.success === true) {
                setComment('');
                setRating('');
                socket.emit('send_message', data.post.comments);
                setIsComment(true);
                Toast.toastSuccess(data.message);
            }
        } catch (err) {
            if (err.response.status === 401) {
                // Add the attributes to the button element
                setComment('');
                setRating(0);
            }
        }
    }
    useEffect(() => {
        if (comments.find(cmt => cmt?.postedBy.toString() === user?._id.toString())) {
            setIsComment(true);
        }
    }, [roomdata])
    useEffect(() => {
        socket.on('receive_message', (data) => {
            setCommentsRealTime(data);
        })
    }, [socket])

    const handleLogin = () => {
        navigate('/login', { replace: true, state: { prevUrl: location.pathname } });
    }
    let uiCommentUpdate = commentsRealTime?.length > 0 ? commentsRealTime : comments;
    if (!roomdata) {
        return <></>;
    }
console.log(isComment)
    return (
        <div className="container mt-4">
            <div id="overview ">
                <div className="d-flex justify-content-between align-content-between mb-2">
                    <div className="overview_left">
                        <div className='fs-3 text-black fw-bold'>{roomdata.name}</div>
                        <div className="rating">
                            {[...Array(5)].map((_, index) => {
                                return (
                                    <span key={index}
                                        className={`${index + 1 <= roomdata.rating ? "text-warning" : ""} fs-5`}
                                    >&#9733;</span>
                                )
                            })}
                        </div>
                        <div className='fs-5 text-black d-flex align-items-center'><FontAwesomeIcon icon={faMapMarker} className='fs-6 text-black-50 me-2' />{roomdata.address}</div>
                    </div>
                    <div className="overview_right d-flex flex-column  align-items-end">
                        <div className='fs-6 text-black'>Price/room/night starts from</div>
                        <div className='fs-1 text-danger'>{roomdata.pricePerNight} $</div>
                        {
                            user ? <button type='submit' data-bs-toggle="modal" data-bs-target="#bookingModal" className="btn btn-primary d-flex justify-content-center align-items-center" >
                                Book Now
                            </button> :
                                <button type='submit' className="btn btn-primary d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                                    Book Now
                                </button>

                        }
                    </div>
                </div>

                <div className="row w-100 max-height">
                    <div className="col-6 w-25 max-height p-1 ps-3 p-0">
                        {
                            <img src={roomdata.imageUrls[Math.floor(Math.random() * 8)]} alt="room preview" className='ps-2 w-100 h-100' />
                        }
                    </div>
                    <div className="col-6 w-75 max-height">
                        <div className="row h-50">
                            {
                                roomdata.imageUrls.map((image) => {
                                    return (
                                        <img src={image} alt={image} className='w-25 p-0 h-100 p-1 rounded-3' />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <AboutAccommation />
            </div>
            <Location />
            <div id="facilities" className='d-flex flex-column mt-5 mb-5'>
                <h3 className='text-black w-100'>All Facilities</h3>
                <div className="item d-flex flex-wrap">
                    {
                        roomdata.facilities.map((item) => {
                            return (
                                <div className="btn btn-light p-3 m-1 fw-semibold">
                                    {item}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <OurPolicy />
            <div id="feedback" className="comment_section mt-5 mb-5">
                <h3 className='text-black'>Feedback of Guest</h3>
                <hr></hr>
                {
                    uiCommentUpdate.map(comment => (
                        <div className='text-black w-100 bg-light p-3 mb-3 rounded-3' key={comment._id}>
                            {[...Array(5)].map((_, index) => {
                                return (
                                    <span key={index}
                                        className={`${index + 1 <= comment.rating ? "text-warning" : ""}  p-1 fs-5`}
                                    >&#9733;</span>
                                )
                            })}
                            <div className="text-black fs-6">
                                <div className='fw-bold p-2'>{comment.postedByUser}: <span className='fw-normal'>{comment.comment}</span> </div>
                                <div className='fs-6 p-2'>{comment.created}</div>
                            </div>
                        </div>

                    ))
                }
                { isComment === true ? <p className='text-black'>You already give us your feedback, we appreciate the compliments you give us. <span className='text-black fw-bolder'>Best regard</span></p>:
                    <div className="comment">
                        <form onSubmit={addComment} className='d-flex flex-column justify-content-center'>
                            <div className="stars">
                                {[...Array(5)].map((_, index) => {
                                    return (
                                        <span role="button" key={index}
                                            className={`${index + 1 <= rating ? "text-warning" : ""} fw-bolder p-1 fs-2`}
                                            onClick={() => setRating(index + 1)}
                                        >&#9733;</span>
                                    )
                                })}
                            </div>
                            <div className="feedback d-flex">
                                <input
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Add a comment..."
                                    className='w-100 border-1 rounded-1 p-3 me-3'
                                />
                                {
                                    user ? <button type='submit' id='submitFeedback' className="btn btn-primary d-flex justify-content-center align-items-center" >
                                        Send
                                        <FontAwesomeIcon icon={faPaperPlane} className='p-2' />
                                    </button>
                                        : <button type='submit' id='submitFeedback' data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-primary d-flex justify-content-center align-items-center" >
                                            {' '}
                                            Send
                                            <FontAwesomeIcon icon={faPaperPlane} className='p-2' />
                                        </button>
                                }
                            </div>
                        </form>
                    </div>}
            </div>

            <BookingModal user={user} roomData={roomdata} />
            <div class="modal fade" id="staticBackdrop" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content">
                        <div class="d-flex justify-content-between align-items-center p-3 pb-0">
                            <h5 class="modal-title text-black fw-bold" id="staticBackdropLabel">Login Required</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class=" text-black p-3 pb-0">
                            Since this is a member-only feature, you must log in to your Traveloka Account.
                        </div>
                        <div class="d-flex flex-column p-3">
                            <button type="button" class="btn btn-secondary mb-2" data-bs-dismiss="modal">Maybe Later</button>
                            <button type="button" onClick={handleLogin} class="btn btn-primary" data-bs-dismiss="modal">Log In and Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RoomInfor