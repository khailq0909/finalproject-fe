import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import slide1 from "../assets/images/slide1.jpg";
import * as Loading from "../common/Loader/Loader";

const BASE_URL = process.env.REACT_APP_API_KEY
function Login() {

    const [sentCode, setSentCode] = useState();
    const [email, setEmail] = useState();
    const [validCode, setValidCode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading1, setIsLoading1] = useState(false);
    const [passWord, setNewPassWord] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [err, setErr] = useState("");
    const [credentials, setCredentials] = useState({
        password: undefined,
        email: undefined,
    });
    const { loading, error, dispatch } = useContext(AuthContext);
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

console.log(BASE_URL)
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("https://finalproject-api.onrender.com/api/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate(from, { replace: true });

        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };

    const handleSendCode = async (e) => {
        setIsLoading(true);
        setValidCode(false)
        setTimeout(() => {
            axios.post('https://finalproject-api.onrender.com/api/auth/sendcode', {
                email: email
            }).then(() => {
                setSentCode(true)
                setErr("")
            }).catch((err) => {
                setErr(err.response.data.message)
            }).finally(() => {
                setIsLoading(false); // Move setIsLoading(false) inside setTimeout callback
            });
        }, 3000)
    }
    const handleCheckCode = (value) => {
        if (value.length === 4) {
            setIsLoading1(true)
            setTimeout(() => {
                axios.post('https://finalproject-api.onrender.com/api/auth/checkOtp', {
                    otp: value
                }).then(() => {
                    setValidCode(true)
                    setErr("")
                }).catch((err) => {
                    console.log(err.response.data)
                    setErr(err.response.data.message)
                }).finally(() => {
                    setIsLoading1(false); // Move setIsLoading(false) inside setTimeout callback
                });
            }, 3000)
        }
    }
    const handleChangePassword = () => {
        axios.post(`https://finalproject-api.onrender.com/apiauth/changePassword`, {
            email: email,
            password: passWord,
        },{withCredentials:true}).then(() => {
            window.location.reload()
            setEmail("")
            setValidCode(false)
            setSentCode(false)
        }).catch((err) => {
            console.log(err)
        })

    }
    return (

        <section className="vh-100" style={{ backgroundColor: "#F6F9FA" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: "1rem" }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src={slide1}
                                        alt="login form" className="img-fluid w-100 h-100 object-fit-cover" style={{ borderRadius: "1rem 0 0 1rem" }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                                                <span className="h1 fw-bold mb-0">MyHome Stay</span>
                                            </div>
                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form2Example17">Email</label>
                                                <input type="email" id="email" placeholder="Enter your Email" className="form-control form-control-lg" onChange={handleChange} />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form2Example27">Password</label>
                                                <input type="password" id="password" className="form-control form-control-lg" placeholder="Enter your password" onChange={handleChange} />
                                            </div>
                                            {error && <span className="text-danger">{error.message}</span>}
                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-primary btn-lg btn-block" type="button" disabled={loading} onClick={handleClick}>Sign in</button>
                                            </div>
                                            <p className="mb-1 pb-lg-2" style={{ color: "#393f81" }}>forgot password? <span type="button" class="text-decoration-underline text-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                click here
                                            </span>
                                            </p>
                                            <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>don't have an account? <Link
                                                className="text-primary" to="/register">Register here</Link></p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content p-3">
                        <div class="d-flex justify-content-between">
                            <h5 class="text-black fw-semibold" id="staticBackdropLabel">Forgot password</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="p-2">
                            <div className="row">
                                <div className="col-12 col mb-2">
                                    <div className="row d-flex align-items-center">
                                        {
                                            validCode ? <div className="col-12 "> <div className="text-black p-3 border-1 border rounded-1 bg-light user-select-none">{email}</div> </div> : <><div className="col-10 pe-1">
                                                <input type="text" className="form-control p-3" id="email" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} required />
                                            </div>
                                                <div className="col-2 ps-0">
                                                    <div className="btn btn-danger w-100 p-3" onClick={handleSendCode}>{isLoading ? Loading.LoadingUpload(40, 23, "#fff", "") : <span>Send</span>}</div>
                                                </div></>
                                        }

                                    </div>
                                </div>
                                {
                                    sentCode === true ?
                                        <div className="col col-12">
                                            <div className="row d-flex align-items-center ">
                                                {
                                                    validCode === true ? <div className="col-3 pe-0">
                                                        {isLoading1 ? Loading.LoadingGetData(100, 20, "fff", "") :

                                                            <div className="btn btn-success p-3 w-100"><span>Ok</span></div>}
                                                    </div> :
                                                        <div className="col-3 pe-0">
                                                            {isLoading1 ? Loading.LoadingGetData(100, 20, "fff", "") :
                                                                <input type="number" className="form-control p-3" id="forgotCode" placeholder="Code" onChange={e => handleCheckCode(e.target.value)} required />}
                                                        </div>
                                                }
                                                {
                                                    validCode === true ?
                                                        <div className="col-9 ps-1">
                                                            <input type="password" className="form-control p-3" id="password" placeholder="Your New Password" onChange={e => setNewPassWord(e.target.value)} required />
                                                        </div> :
                                                        <div className="col-9 ps-1">
                                                            <input type="password" className="form-control p-3" id="password" placeholder="Your New Password" readOnly required />
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                        : <></>
                                }
                            </div>
                        </div>
                        <span className="text-danger">{err}</span>
                        <div class="footer w-100 mt-3">
                            <button type="button" class="btn btn-primary w-100" onClick={handleChangePassword}>Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login