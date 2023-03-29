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
const login = async (email, password) => {
    let user = await request.post(endPoints.login, { email, password });
    return user;
};
const logout = async () => {
    let user = await request.get(endPoints.logout);
    return user;
}


export {
    reigister,
    login,
    logout
}