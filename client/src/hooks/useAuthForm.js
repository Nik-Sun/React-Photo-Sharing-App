import {useState} from 'react'
export const useAuthForm = (init) =>{
    const [formValues,setFormValues] = useState(init);

    const onFormChange = (e) => {
        setFormValues(v => ({...v, [e.target.name] : e.target.value}))
    };
    return {
        formValues,
        onFormChange
    };
};