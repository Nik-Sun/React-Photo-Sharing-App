import { createContext } from 'react';
import { toast, Toaster } from 'react-hot-toast';
export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const contextValues = { toast, Toaster };
    return <ToastContext.Provider value={contextValues}>
        {children}
    </ToastContext.Provider>
}
