import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { logout } from '../Redux/Slices/authSlice';

const Sidebar = () => {

    const dispatch = useDispatch();

    const logoutUser = async () => {
        try {
            await dispatch(logout());
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="col-md-3 col-lg-2 d-md-block sidebar bg-dark text-white vh-100 p-3">
            <h4 className="text-center">Admin Panel</h4>
            <hr />
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/admin/dashboard" className="nav-link text-white">
                        <i className="bi bi-house-door"></i> Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/students" className="nav-link text-white">
                        <i className="bi bi-people"></i> Students
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/settings" className="nav-link text-white">
                        <i className="bi bi-gear"></i> Settings
                    </Link>
                </li>
                <li className="nav-item">
                    <button onClick={logoutUser} className="nav-link text-white">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
