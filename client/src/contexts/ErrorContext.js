import { createContext, useState } from 'react';

export const ErrorContext = createContext();
export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState({
        code: 404,
        message: 'Resource not Found'
    });

    return <ErrorContext.Provider value={error}>
        {children}
    </ErrorContext.Provider>;
};