import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { useAuthForm } from "../../hooks/useAuthForm";
import { useValidateForm } from "../../hooks/useValidateForm";
import { AuthContext } from '../../contexts/AuthContext';

export const Login = () => {
    const navigate = useNavigate();
    const { loginUser } = useContext(AuthContext)

    const { formValues, onFormChange } = useAuthForm({
        email: '',
        password: ''
    });
    const { errors, isFormValid, onBlur } = useValidateForm(formValues);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const isValid = isFormValid();
        if (isValid) {
            try {
                await loginUser(formValues.email, formValues.password);
                navigate('/')
            } catch (error) {
                console.log(error);
                alert(error)
            }

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
                        onBlur={onBlur}
                        onChange={onFormChange} />
                    <span className='text-danger'>{errors.email.errorMsg}</span>
                </div>

                <div className="form-group">
                    <input
                        className="form-control rounded-0"
                        value={formValues.password}
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onBlur={onBlur}
                        onChange={onFormChange} />
                    <span className='text-danger'>{errors.password.errorMsg}</span>
                </div>

                <div className="form-group tm-text-right">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
};