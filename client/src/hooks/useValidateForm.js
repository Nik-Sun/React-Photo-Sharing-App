import { useState } from 'react'

import {
    emailValidator,
    passwordValidator,
    confirmPasswordValidator,
    fileValidator,
    titleValidator,
    usernameValidator
} from '../utils/validation/validator';

export const useValidateForm = () => {

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        file: '',
        title: '',
        username: '',
    });




    const validateForm = (formValues) => {

        let isValid = true;

        if (formValues.email) {
            let error = emailValidator(formValues.email);

            if (error) {
                isValid = false;
                setErrors(err => ({ ...err, email: error }))
            }
        }
        if (formValues.password) {
            let error = passwordValidator(formValues.password);
            if (error) {
                isValid = false;
                setErrors(err => ({ ...err, password: error }))
            }
        }
        if (formValues.confirmPassword) {

            let error = confirmPasswordValidator(formValues.password, formValues.confirmPassword);
            if (error) {
                isValid = false;

                setErrors(err => ({ ...err, confirmPassword: error }))
            }
        }
        if (formValues.file) {
            let error = fileValidator(formValues.file);
            if (error) {
                isValid = false;
                setErrors(err => ({ ...err, [err.file.isValid]: false }))
            }
        }
        if (formValues.title) {
            let error = titleValidator(formValues.title);
            if (error) {
                isValid = false;
                setErrors(err => ({ ...err, [err.title]: false }))
            }
        }
        if (formValues.username) {
            let error = usernameValidator(formValues.username);
            if (error) {
                isValid = false;
                setErrors(err => ({ ...err, username: error }))
            }
        }
        return isValid;
    }

    return {
        errors,
        validateForm
    };

};