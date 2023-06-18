import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

import * as userService from '../services/userServise'
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { user, setLocalStorage } = useLocalStorage('user');



    const createUser = async (username, email, password) => {
        let createdUser = await userService.reigister(username, email, password);
        setLocalStorage(createdUser);
    };

    const loginUser = async (email, password, rememberMe) => {
        try {
            let loggedUser = await userService.login(email, password, rememberMe);
            setLocalStorage(loggedUser);
            console.log('login fired');
        } catch (error) {
            console.log('login fired with error');
            throw error.description;
        }

    };

    const updateUser = (updatedAccessToken) => {
        let userString = localStorage.getItem('user');
        if (userString) {
            let user = JSON.parse(userString);
            user.accessToken = updatedAccessToken;
            setLocalStorage(user);
        }
    }

    const logoutUser = async () => {
        setLocalStorage({});
    };

    const isOwner = (ownerId) => {
        const currentUserId = user.id;
        console.log(currentUserId)
        console.log(ownerId)
        if (ownerId !== currentUserId) {
            return false;
        }
        return true;
    }

    const contextValues = {
        createUser,
        loginUser,
        logoutUser,
        updateUser,
        username: user.username,
        email: user.email,
        userId: user.id,
        isOwner,
        isAuthenticated: user.accessToken ? true : false
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};