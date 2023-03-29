import { useCallback, useEffect, useState } from 'react'

import {
    emailValidator,
    passwordValidator,
    confirmPasswordValidator,
    tagsValidator,
    titleValidator,
    usernameValidator
} from '../utils/validation/validator';

export const useValidateForm = (formValues) => {
    const initialErrors = {
        email: {
            isValid: true,
            error: ''
        },
        password: {
            isValid: true,
            error: ''
        },
        confirmPassword: {
            isValid: true,
            error: ''
        },
        tags: {
            isValid: true,
            error: ''
        },
        title: {
            isValid: true,
            error: ''
        },
        username: {
            isValid: true,
            error: ''
        },
    };
    const [errors, setErrors] = useState(initialErrors);
    const initialIsTouched = {
        email: false,
        password: false,
        confirmPassword: false,
        tags: false,
        title: false,
        username: false,
    };

    const [isTouched, setIsTouched] = useState(initialIsTouched);



    const validateForm = () => {

        if (formValues.hasOwnProperty('email')) {
            let error = emailValidator(formValues.email);

            if (error && isTouched.email) {

                setErrors(err => ({ ...err, email: { ...err.email, error } }))
            }
            else {
                setErrors(err => ({ ...err, email: { ...err.email, error: '' } }))
            }

        }
        if (formValues.hasOwnProperty('password')) {
            let error = passwordValidator(formValues.password);
            if (error && errors.password.isTouched) {

                setErrors(err => ({ ...err, password: { ...err.password, error } }))
            }
            else {
                setErrors(err => ({ ...err, password: { ...err.password, error: '' } }))
            }

        }
        if (formValues.hasOwnProperty('confirmPassword')) {

            let error = confirmPasswordValidator(formValues.password, formValues.confirmPassword);
            if (error && errors.confirmPassword.isTouched) {

                setErrors(err => ({ ...err, confirmPassword: { ...err.confirmPassword, error } }))
            }
            else {
                setErrors(err => ({ ...err, confirmPassword: { ...err.confirmPassword, error: '' } }))
            }

        }
        if (formValues.hasOwnProperty('tags')) {

            let error = tagsValidator(formValues.tags);

            if (error && isTouched.tags) {

                setErrors(err => ({ ...err, tags: { ...err.tags, error, isValid: false } }))
            }
            else {
                setErrors(err => ({ ...err, tags: { ...err.tags, error: '' } }))
            }
        }
        if (formValues.hasOwnProperty('title')) {
            let error = titleValidator(formValues.title);

            if (error && isTouched.title) {

                setErrors(err => ({ ...err, title: { ...err.title, error, isValid: false } }))
            }
            else {
                setErrors(err => ({ ...err, title: { ...err.title, error: '' } }))
            }
        }
        if (formValues.hasOwnProperty('username')) {
            let error = usernameValidator(formValues.username);
            if (error && errors.username.isTouched) {
                errors.username.isValid = false;
                setErrors(err => ({ ...err, username: { ...err.username, error: error, isValid: false } }))
            }
            else {
                setErrors(err => ({ ...err, username: { ...err.username, error: '' } }))
            }

        }

    }

    useEffect(() => {

    }, [isTouched])


    const onBlur = (e) => {
        setIsTouched(oldState => {
            let newState = { ...oldState };
            newState[e.target.name] = true;
            return newState;
        });
        validateForm();
    };

    const isFormValid = () => {
        return Object.values(errors).includes(x => x.isValid === false)
    };

    return {
        errors,
        isFormValid,
        onBlur
    };

};