const emailRegex = /^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/;


export const validateRegisterForm = (formValues) => {
    const errors = {};
    let isValid = true;
    Object.entries(formValues).forEach(v =>{
        if(v[1] === '')
        errors[v[0]] = 'Field cannot be empty'
    })
    if(emailRegex.test(formValues.email) === false) {
        errors.email = "Invalid Email";
        isValid = false;
    }
    if(formValues.password !== formValues.passwordConfirm) {
        errors.password = 'Passwords do not match';
        isValid=false;
    }
    return [isValid,errors];
};