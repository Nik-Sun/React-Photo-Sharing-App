import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthForm } from '../../hooks/useAuthForm'
import { useValidateForm } from '../../hooks/useValidateForm';
import { AuthContext } from '../../contexts/AuthContext';

export const Register = () => {
    const navigate = useNavigate();
    const { createUser } = useContext(AuthContext);
    const { formValues, onFormChange } = useAuthForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { Toaster, validateForm, onBlur } = useValidateForm(formValues);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            createUser(
                formValues.username,
                formValues.email,
                formValues.password
            );
            navigate('/');
        }

    };


    return (
        <>
            <Toaster />
            <div className="col-12 mb-5 mt-2">
                <h2 className="text-center tm-text-primary mb-5">Register</h2>
                <form onSubmit={onFormSubmit} className="tm-contact-form mx-auto">
                    <div className="form-group">
                        <input
                            className="form-control rounded-0"
                            value={formValues.username}
                            type="text"
                            name="username"
                            placeholder="Username"
                            onBlur={onBlur}
                            onChange={onFormChange} />
                        {/* <span className='text-danger'>{errors.username.errorMsg}</span> */}
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control rounded-0"
                            value={formValues.email}
                            type="email" name="email"
                            placeholder="Email"
                            onBlur={onBlur}
                            onChange={onFormChange} />
                        {/* <span className='text-danger'>{errors.email.errorMsg}</span> */}
                    </div>

                    <div className="form-group">
                        <input
                            className="form-control rounded-0"
                            value={formValues.password}
                            type="password"
                            name="password"
                            placeholder="Password"
                            onBlur={onBlur}
                            onChange={onFormChange} />
                        {/* <span className='text-danger'>{errors.password.errorMsg}</span> */}
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control rounded-0"
                            value={formValues.confirmPassword}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onBlur={onBlur}
                            onChange={onFormChange} />
                        {/* <span className='text-danger'>{errors.confirmPassword.errorMsg}</span> */}
                    </div>

                    <div className="form-group tm-text-right">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </>
    );
}