import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/admin/dashboard", { replace: true });
        }else{
            navigate("/login", { replace: true });

        }
    }, [isAuthenticated]);

    return children;
};

export default AuthRedirect;
