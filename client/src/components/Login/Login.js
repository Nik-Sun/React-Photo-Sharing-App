import { useContext } from 'react'

import { useAuthForm } from "../../hooks/useAuthForm";
import { useValidateForm } from "../../hooks/useValidateForm";
import { AuthContext } from '../../contexts/AuthContext';

export const Login = () => {
    const { loginUser } = useContext(AuthContext)

    const { formValues, onFormChange } = useAuthForm({
        email: '',
        password: ''
    });
    const { errors, validateForm } = useValidateForm();

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm(formValues);
        if (isValid) {
            loginUser(formValues.email, formValues.password);
        }

    };

    return (
        <div className="col-12 mb-5 mt-2">
            <h2 className="text-center tm-text-primary mb-5">Login</h2>
            <form onSubmit={onFormSubmit} className="tm-contact-form mx-auto">

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

                <div className="form-group tm-text-right">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
};