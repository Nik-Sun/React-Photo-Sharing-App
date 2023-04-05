import { useState } from 'react'

import {
    emailValidator as email,
    passwordValidator as password,
    confirmPasswordValidator as confirmPassword,
    titleValidator as title,
    usernameValidator as username,
    commentValidator as comment
} from '../utils/validation/validator';

export const useValidateForm = (formValues) => {

    const initialErrors = {};
    Object.keys(formValues).forEach(k => {
        initialErrors[k] = {
            isValid: false,
            errorMsg: '',
            isTouched: false
        }
    })
    // const initialErrors = {
    //     email: {
    //         isValid: false,
    //         errorMsg: '',
    //         isTouched: false
    //     },
    //     password: {
    //         isValid: false,
    //         errorMsg: '',
    //         isTouched: false
    //     },
    //     confirmPassword: {
    //         isValid: false,
    //         errorMsg: '',
    //         isTouched: false
    //     },
    //     tags: {
    //         isValid: false,
    //         errorMsg: '',
    //         isTouched: false
    //     },
    //     title: {
    //         isValid: false,
    //         errorMsg: '',
    //         isTouched: false
    //     },
    //     username: {
    //         isValid: false,
    //         errorMsg: '',
    //         isTouched: false
    //     },
    // };

    const validator = {
        email,
        password,
        confirmPassword,
        title,
        username,
        comment
    }

    const [errors, setErrors] = useState(initialErrors);




    const validateField = (updatedErrors, fieldName) => {
        let isValid = true;
        const value = formValues[fieldName];
        console.log(`field name : ${fieldName} field val: ${value}`);
        const errorsCopy = JSON.parse(JSON.stringify(updatedErrors));
        const result = fieldName === 'confirmPassword'
            ? validator[fieldName](formValues.password, value)
            : validator[fieldName](value);

        if (result) {
            errorsCopy[fieldName].isValid = false;
            errorsCopy[fieldName].errorMsg = result;
            isValid = false;
        }
        else {
            errorsCopy[fieldName].isValid = true;
            errorsCopy[fieldName].errorMsg = '';
        }
        setErrors(errorsCopy);
        return isValid;

    }




    const onBlur = (e) => {
        const fieldName = e.target.name;


        if (errors[fieldName].isTouched === false) {
            const updatedErrors = {
                ...errors,
                [fieldName]: {
                    ...errors[fieldName], isTouched: true
                }
            }
            validateField(updatedErrors, fieldName);
        }
        else {
            validateField(errors, fieldName);
        }



    };

    const isFormValid = () => {

        const formFields = Object.keys(formValues);

        for (const field of formFields) {
            let isFieldValid = validateField(errors, field);
            if (isFieldValid === false) return false;
        }
        return true;
    };

    return {
        errors,
        isFormValid,
        onBlur
    };

};