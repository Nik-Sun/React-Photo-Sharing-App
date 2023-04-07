import { Route, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { Login } from "../Login/Login";
import { Upload } from "../Upload/Upload";



export const GuardedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? <>{children}</> : <Navigate to={'/login'} />
};


