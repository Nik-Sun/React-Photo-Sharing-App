import { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

import * as userService from '../services/userServise'
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { user, setLocalStorage } = useLocalStorage('user');



    const createUser = async (username, email, password) => {
        let createdUser = await userService.reigister(username, email, password);
        delete createdUser.password
        setLocalStorage(createdUser);
    };

    const loginUser = async (email, password) => {
        let loggedUser = await userService.login(email, password);
        setLocalStorage(loggedUser);
    };

    const logoutUser = async () => {
        let noUser = await userService.logout();
        setLocalStorage(noUser);
    };

    const contextValues = {
        createUser,
        loginUser,
        logoutUser,
        user
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};