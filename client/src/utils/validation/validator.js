const emailRegex = /^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/;


const emailValidator = (email) => {
    if (!email) {
        return 'Email is required';
    }
    else if (emailRegex.test(email) === false) {
        return 'Invalid Email';
    }
    return '';
};
const passwordValidator = (password) => {
    if (!password) {
        return 'Password is required'
    }
    else if (password.length < 6) {
        return 'Password must be at least 6 characters long'
    }
    return '';
};
const confirmPasswordValidator = (password, passwordConfirm) => {
    if (!passwordConfirm) {
        return 'Confirm password is required'
    }
    else if (passwordConfirm !== password) {
        return 'Passwords do not match';
    }
    return '';
};
const commentValidator = (comment) => {
    if (comment.length === 0) {
        return 'You cannot add empty comment';
    } if (comment.length > 160) {
        return 'Comments must be brief, at most 160 characters';
    }

};
const titleValidator = (title) => {
    if (!title) {
        return 'Title is required';
    }
};
const usernameValidator = (username) => {
    if (!username) {
        return 'Username is required'
    }
    else if (username.length < 3) {
        return 'Username must be at least 3 charachters long'
    }
}

export {
    emailValidator,
    passwordValidator,
    confirmPasswordValidator,
    commentValidator,
    titleValidator,
    usernameValidator
}