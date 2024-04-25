import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomeOwner from "./pages/HomeOwner/HomeOwner";
import Admin from "./pages/Admin/Admin";
import RoomDetail from "./pages/RoomDetail/RoomDetail";
import Me from "./pages/Me/Me";
import ManageRoom from "./pages/HomeOwner/ManageRoom";
import EditRoom from "./pages/HomeOwner/EditRoom";
import AddRoom from "./pages/HomeOwner/AddRoom";
import ManageUser from "./pages/Admin/ManageUser";
import ManageHomeOwner from "./pages/Admin/ManageHomeOwner";
import SearchList from "./pages/SearchList";
import Payment from "./pages/Payment";
import ManagePayment from "./pages/HomeOwner/ManagePayment";
import BookingHistory from "./pages/BookingHistory";
import OwnerRegister from "./pages/OwnerRegister";
import ManageRequestHomeOwner from "./pages/Admin/ManageRequestHomeOwner";
import Layout from "./components/Layout";
import RequireAuth from "./utils/RequireAuth";
import RequireHome from "./utils/RequireHome";
import RequireAdmin from "./utils/RequireAdmin";
import Unauthorized from "./components/Unauthorized";
function App() {
  return (
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/me" element={<Me />} />
          <Route path="/rooms/:roomId" element={<RoomDetail/>}/>
          <Route path="/search" element={<SearchList />} />

          <Route path="/booking-history" element={< BookingHistory />} />
          <Route path="/bookings/payment" element={< Payment/>} />
          <Route path="/owner-register" element={< OwnerRegister/>} /> */}

          {/* HomeOwner ROUTES */}
          {/* <Route path ="/homeowner-home" element = {<HomeOwner/>}>
          <Route path ="manage-room" element = {<ManageRoom/>}/>
          <Route path ="manage-room/add" element = {<AddRoom/>}/>
          <Route path ="manage-room/edit/:roomId" element = {<EditRoom/>}/>
          <Route path ="manage-payment" element = {<ManagePayment/>}/>
          </Route> */}

          {/* Admin ROUTES */}
          {/* <Route path ="/admin-home" element = {<Admin/>}>
          <Route path ="manage-user" element = {<ManageUser/>}/>
          <Route path ="manage-homeowner" element = {<ManageHomeOwner/>}/>
          <Route path ="partnership-request" element = {<ManageRequestHomeOwner/>}/>
          </Route> */}
          {/* TEST ROUTE */}

          <Route path="/" element={<Layout/>}>
            {/* PUBLIC ROUTE */}
            <Route path="/" element={<Home />}/>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="me" element={<Me />} />
            <Route path="rooms/:roomId" element={<RoomDetail />} />
            <Route path="search" element={<SearchList />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* USER ROUTE */}
            <Route element={<RequireAuth/>}>
              <Route path="/booking-history" element={<BookingHistory />} />
              <Route path="/bookings/payment" element={<Payment />} />
              <Route path="/owner-register" element={<OwnerRegister />} />
            </Route>
            {/* HOMEOWNER ROUTE */}
            <Route element={<RequireHome/>}>
              <Route path="/homeowner-home" element={<HomeOwner />}>
                <Route path="manage-room" element={<ManageRoom />} />
                <Route path="manage-room/add" element={<AddRoom />} />
                <Route path="manage-room/edit/:roomId" element={<EditRoom />} />
                <Route path="manage-payment" element={<ManagePayment />} />
              </Route>
            </Route> 
            {/* ADMIN ROUTE*/}

            <Route element={<RequireAdmin/>}>
              <Route path="/admin-home" element={<Admin />}>
                <Route path="manage-user" element={<ManageUser />} />
                <Route path="manage-homeowner" element={<ManageHomeOwner />} />
                <Route
                  path="partnership-request"
                  element={<ManageRequestHomeOwner />}
                />
              </Route>
            </Route> 

          </Route>
        </Routes>
  );
}

export default App;
