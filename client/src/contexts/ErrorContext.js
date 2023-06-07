import { createContext } from 'react';

export const ErrorContext = createContext();
export const ErrorProvider = ({ children }) => {
    const error = {
        code: 404,
        message: 'Resource not Found'
    };

    return <ErrorContext.Provider value={error}>
        {children}
    </ErrorContext.Provider>;
};