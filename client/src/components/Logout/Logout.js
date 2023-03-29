import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { AuthContext } from "../../contexts/AuthContext";
export const Logout = () => {
    const { logoutUser } = useContext(AuthContext);

    useEffect(() => { logoutUser() }, [])

    return <Navigate to={'/'} />
};