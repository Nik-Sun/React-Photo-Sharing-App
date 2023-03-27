import { useContext, useState } from 'react';

import { useAuthForm } from '../../hooks/useAuthForm'
import { useValidateForm } from '../../hooks/useValidateForm';
import { AuthContext } from '../../contexts/AuthContext';

export const Register = () => {
    const { createUser } = useContext(AuthContext);
    const { formValues, onFormChange } = useAuthForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { errors, validateForm } = useValidateForm();

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm(formValues);
        if (isValid) {
            createUser(
                formValues.username,
                formValues.email,
                formValues.password
            );
        }

    };


    return (

        <div className="col-12 mb-5 mt-2">
            <h2 className="text-center tm-text-primary mb-5">Register</h2>
            <form onSubmit={onFormSubmit} id="contact-form" action="" method="POST" className="tm-contact-form mx-auto">
                <div className="form-group">
                    <input
                        className="form-control rounded-0"
                        value={formValues.username}
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        onChange={onFormChange} />
                    <span className='text-danger'>{errors.username}</span>
                </div>
                <div className="form-group">
                    <input
                        className="form-control rounded-0"
                        value={formValues.email}
                        type="email" name="email"
                        placeholder="Email"
                        required
                        onChange={onFormChange} />
                    <span className='text-danger'>{errors.email}</span>
                </div>

                <div className="form-group">
                    <input
                        className="form-control rounded-0"
                        value={formValues.password}
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={onFormChange} />
                    <span className='text-danger'>{errors.password}</span>
                </div>
                <div className="form-group">
                    <input
                        className="form-control rounded-0"
                        value={formValues.confirmPassword}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        onChange={onFormChange} />
                    <span className='text-danger'>{errors.confirmPassword}</span>
                </div>

                <div className="form-group tm-text-right">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    );
}