import * as request from '../utils/request'
const endPoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout'
};

const reigister = async (username, email, password) => {
    let user = await request.post(endPoints.register, { username, email, password });
    return user;
};


export {
    reigister,
}