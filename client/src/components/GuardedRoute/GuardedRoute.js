import { Route, Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";

import { checkStatus } from "../../services/userServise";
import { AuthContext } from "../../contexts/AuthContext";
import { Login } from "../Login/Login";
import { Upload } from "../Upload/Upload";



export const GuardedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const ctx = useRef(useContext(AuthContext))

    useEffect(() => {

        checkStatus().then(x => {
            if (x !== null) {
                ctx.current.updateUser(x.updatedJwt)
            } else {
                ctx.current.logoutUser();
            }
        })
    }, [ctx])

    return isAuthenticated ? <>{children}</> : <Navigate to={'/login'} />
};


