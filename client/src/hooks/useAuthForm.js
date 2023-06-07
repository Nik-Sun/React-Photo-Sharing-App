import { useState } from 'react'


export const useAuthForm = (init) => {
    const [formValues, setFormValues] = useState(init);


    const onFormChange = (e) => {
        if (e.target.type === 'checkbox') {
            setFormValues(v => ({ ...v, [e.target.name]: !v[e.target.name] }));
        } else {
            setFormValues(v => ({ ...v, [e.target.name]: e.target.value }))
        }
    };
    const resetForm = () => {
        setFormValues(init);
    }
    return {
        formValues,
        onFormChange,
        resetForm
    };
};