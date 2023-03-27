import { useState } from "react";

export const useLocalStorage = (key) => {

    const [user, setUser] = useState(() => {
        let user = localStorage.getItem(key);
        if (user) {
            return JSON.parse(user);
        }
        return {};
    });

    const setLocalStorage = (user) => {
        localStorage.setItem(key, JSON.stringify(user));
    };

    return {
        user,
        setLocalStorage
    }

};