import { useState } from 'react'

import {
    emailValidator as email,
    passwordValidator as password,
    confirmPasswordValidator as confirmPassword,
    titleValidator as title,
    usernameValidator as username
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
        username
    }

    const [errors, setErrors] = useState(initialErrors);




    const validateForm = (updatedErrors, fieldName) => {
        let isValid = true;
        const value = formValues[fieldName];
        console.log(`field name : ${fieldName} field val: ${value}`);
        const errorsCopy = JSON.parse(JSON.stringify(updatedErrors));
        const result = fieldName === 'confirmPassword'
            ? validator[fieldName](formValues.password, value)
            : validator[fieldName](value);

        if (result && errorsCopy[fieldName].isTouched === true) {
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
        // if (formValues.hasOwnProperty('email') && field ==='email') {
        //     let error = emailValidator(formValues.email);

        //     if (error && newIsTouched.email) {

        //         setErrors(err => ({ ...err, email: { ...err.email, error } }))
        //     }
        //     else {
        //         setErrors(err => ({ ...err, email: { ...err.email, error: '' } }))
        //     }

        // }
        // if (formValues.hasOwnProperty('password')) {
        //     let error = passwordValidator(formValues.password);
        //     if (error && newIsTouched.password) {

        //         setErrors(err => ({ ...err, password: { ...err.password, error } }))
        //     }
        //     else {
        //         setErrors(err => ({ ...err, password: { ...err.password, error: '' } }))
        //     }

        // }
        // if (formValues.hasOwnProperty('confirmPassword')) {

        //     let error = confirmPasswordValidator(formValues.password, formValues.confirmPassword);
        //     if (error && newIsTouched.confirmPassword) {

        //         setErrors(err => ({ ...err, confirmPassword: { ...err.confirmPassword, error } }))
        //     }
        //     else {
        //         setErrors(err => ({ ...err, confirmPassword: { ...err.confirmPassword, error: '' } }))
        //     }

        // }
        // if (formValues.hasOwnProperty('tags')) {

        //     let error = tagsValidator(formValues.tags);

        //     if (error && newIsTouched.tags) {

        //         setErrors(err => ({ ...err, tags: { ...err.tags, error, isValid: false } }))
        //     }
        //     else {
        //         setErrors(err => ({ ...err, tags: { ...err.tags, error: '' } }))
        //     }
        // }
        // if (formValues.hasOwnProperty('title')) {
        //     let error = titleValidator(formValues.title);
        //     console.log(formValues.title, error, initialIsTouched);
        //     if (error && newIsTouched.title) {

        //         setErrors(err => ({ ...err, title: { ...err.title, error, isValid: false } }))
        //     }
        //     else {
        //         setErrors(err => ({ ...err, title: { ...err.title, error: '', isValid: true } }))
        //     }
        // }
        // if (formValues.hasOwnProperty('username')) {
        //     let error = usernameValidator(formValues.username);
        //     if (error && newIsTouched.username) {
        //         setErrors(err => ({ ...err, username: { ...err.username, error: error, isValid: false } }))
        //     }
        //     else {
        //         setErrors(err => ({ ...err, username: { ...err.username, error: '', isValid: true } }))
        //     }

        // }
        // setIsTouched(newIsTouched);
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
            validateForm(updatedErrors, fieldName);
        }
        else {
            validateForm(errors, fieldName);
        }



    };

    const isFormValid = () => {

        const formFields = Object.keys(formValues);

        for (const field of formFields) {
            let isFieldValid = validateForm(errors, field);
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