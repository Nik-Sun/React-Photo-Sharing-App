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

    const contextValues = {
        createUser,
        user
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};