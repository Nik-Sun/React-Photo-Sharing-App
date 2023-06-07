
import { useContext } from 'react';

import { ToastContext } from '../contexts/ToastContext';
import {
    emailValidator as email,
    passwordValidator as password,
    confirmPasswordValidator as confirmPassword,
    titleValidator as title,
    usernameValidator as username,
    commentValidator as comment
} from '../utils/validation/validator';

export const useValidateForm = (formValues) => {
    const { toast, Toaster } = useContext(ToastContext);

    const initialErrors = {};
    Object.keys(formValues).forEach(k => {
        initialErrors[k] = {
            isValid: false,
            errorMsg: '',
            isTouched: false
        }
    })


    const validator = {
        email,
        password,
        confirmPassword,
        title,
        username,
        comment
    }





    const validateField = (updatedErrors, fieldName) => {
        let isValid = true;
        const value = formValues[fieldName];
        console.log(`field name : ${fieldName} field val: ${value}`);
        const errorsCopy = JSON.parse(JSON.stringify(updatedErrors));
        const result = fieldName === 'confirmPassword'
            ? validator[fieldName](formValues.password, value)
            : validator[fieldName](value);

        if (result) {
            toast.error(result);
            errorsCopy[fieldName].isValid = false;
            errorsCopy[fieldName].errorMsg = result;
            isValid = false;
        }
        else {
            errorsCopy[fieldName].isValid = true;
            errorsCopy[fieldName].errorMsg = '';
        }

        return isValid;

    }




    const onBlur = (e) => {

        const fieldName = e.target.name;


        if (initialErrors[fieldName].isTouched === false) {
            const updatedErrors = {
                ...initialErrors,
                [fieldName]: {
                    ...initialErrors[fieldName], isTouched: true
                }
            }
            validateField(updatedErrors, fieldName);
        }
        else {
            validateField(initialErrors, fieldName);
        }

    };

    const isFormValid = () => {

        const formFields = Object.keys(formValues);

        for (const field of formFields) {
            if (field === 'rememberMe') { continue; }
            let isFieldValid = validateField(initialErrors, field);
            if (isFieldValid === false) return false;
        }
        return true;
    };

    return {
        initialErrors,
        isFormValid,
        onBlur
    };

};