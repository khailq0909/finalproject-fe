import { useLocation, Navigate, Outlet } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import { useContext } from "react";

const RequireAdmin = () => {
    const { user} = useContext(AuthContext)
    const location = useLocation();

    return (
        user?.isAdmin === true
            ? <Outlet />
            : user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAdmin;