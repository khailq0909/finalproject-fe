
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import Swal from 'sweetalert2'
import axios from "axios";
import moment from "moment";
import { useEffect } from "react";


// This value is from the props in the UI
const style = {"layout":"horizontal", "disableMaxWidth":"true"};
const initialOptions = {
    "client-id": "AawEazCRnLEsSgjmnVJhPt9x2r5PAHRGlp0QzrqL3jbgKUyvcpw9SWpwsrGm-qCd7-Ij7D5sLPM9nywQ",
    currency: "USD",
    intent: "capture",
    components: "buttons"
  };



// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner,currency,amount,payload, setIsSuccess }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    useEffect(()=>{
        dispatch({
            type: 'resetOptions',
            value: {
               ...options,
                currency: currency,
            },
        });
    },[currency])
    const handleSaveOrder = async () => {
        const res = await axios.post("/bookings", {...payload});
        if (res.status === 200) {
            console.log(res.data.order)
            const sendEmail = {
                email: payload?.bookingby?.email,
                subject: "Your order has been confirmed please check your code!",
                html: `
                <h3>Dear ${payload?.bookingby?.lastname}</h3>
                <p>Thank you for your reservation at MyHomeStay.com. We are pleased to wellcome you.</p>
                <p><strong>Room Name: </strong> ${res?.data?.order?.roomname}</p>
                <p><strong>Room Address: </strong> ${res?.data?.order?.room?.address}</p>
                <p><strong>Check-in:</strong> ${moment(res?.data?.order?.checkin).format('DD-MM-YYYY')} after 7:00 AM</p>
                <p><strong>Check-out:</strong> ${moment(res.data?.order?.checkout).format('DD-MM-YYYY')} before 7:00 PM</p>
                <p>Your reservation code is attach below. Please give it to homeowner to checkin</p>
                <strong>${res?.data?.order?.bookingcode}</strong>
                <p>Enjoy your vercation and stay safe.</p>
                <p>Best regard.</p>
                `
            }
            axios.post(`https://finalproject-api.onrender.com/api/emails/sendEmail`,sendEmail)
            setIsSuccess(true);
            Swal.fire({
                title: 'Congratulations!',
                text: 'Order was created successfully. This page will automatically redirect to the home page in 5 seconds.',
                icon: 'success',
                timer: 5000,
                timerProgressBar: true,
                allowOutsideClick: false,
                willClose: () => {
                    window.history.pushState(null, null, '/')
                    window.location.href = '/'; // Replace '/' with your home page URL
                }
            })
        } else {
            Swal.fire('Oops...', 'Something went wrong!', 'error');
        }
    }
    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) => actions.order.create({
                    purchase_units:[
                        {amount: {currency_code: currency, value: amount}}
                    ]
                }).then(orderId => orderId)}
                onApprove={(data, actions) => {
                    actions?.order.capture().then(async(res)=>{
                        handleSaveOrder();
                    })
                }}
            />
        </>
    );
}

export default function Paypal({amount,payload, setIsSuccess}) {
    return (
        <div style={{ maxWidth: "100%", minHeight: "200px" }}>
            <PayPalScriptProvider options={initialOptions}>
                <ButtonWrapper setIsSuccess={setIsSuccess} payload={payload} currency={'USD'} amount={amount} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}