import { createContext } from 'react';
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
        try {
            let loggedUser = await userService.login(email, password);
            setLocalStorage(loggedUser);
            console.log('login fired');
        } catch (error) {
            console.log('login fired with error');
            throw error.message;
        }

    };

    const logoutUser = async () => {
        console.log('logout fire');
        await userService.logout();
        setLocalStorage({});
    };

    const isOwner = (ownerId) => {
        const currentUserId = user._id;
        if (ownerId !== currentUserId) {
            return false;
        }
        return true;
    }

    const contextValues = {
        createUser,
        loginUser,
        logoutUser,
        username: user.username,
        isOwner,
        isAuthenticated: user.accessToken ? true : false
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};