import * as request from '../utils/request';
import { errors } from '../utils/errors';
const endPoints = {
    register: '/users/register',
    //login: 'https://localhost:7127/api/users/login',
    login: '/users/login',
    logout: '/users/logout'
};

const reigister = async (username, email, password) => {
    let user = await request.post(endPoints.register, { username, email, password });
    return user;
};
const login = async (email, password, rememberMe) => {
    let user = await request.post(endPoints.login, { email, password, rememberMe });
    return user;
};
// const login = async (email, password) => {
//     let options = {
//         method: "post",
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//     }
//     let response = await fetch(endPoints.login, options);

//     if (response.ok === false) {
//         console.log(response);
//         throw await response.json();
//     }
//     return await response.json();
// }
const logout = async () => {
    let user = await request.get(endPoints.logout);
    return user;
}


export {
    reigister,
    login,
    logout
}