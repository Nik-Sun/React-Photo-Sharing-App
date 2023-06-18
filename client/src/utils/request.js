const baseUrl = 'https://localhost:7127/api';

async function request(method, target, data) {

    let targetUrl = baseUrl + target;

    let options = {
        method,
        credentials: 'include',
        headers: {}
    }
    if (data !== undefined) {
        if (data instanceof FormData) {
            options.body = data;
        }
        else {
            options.body = JSON.stringify(data);
            options.headers['content-type'] = 'application/json';
        }

    }
    let user = localStorage.getItem('user');


    if (user && user !== '{}') {
        let accessToken = JSON.parse(user).accessToken
        options.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    try {
        let response = await fetch(targetUrl, options);
        if (response.status === 401) {
            throw new Error(response.statusText);
        } else if (response.ok === false) {
            let error = await response.json();
            throw error;
        }
        if (response.status === 204) {
            return {};
        } else {
            return response.json();
        }
    } catch (error) {
        throw error;
    }
}
const get = request.bind({}, 'GET');
const post = request.bind({}, 'POST');
const put = request.bind({}, 'PUT');
const del = request.bind({}, 'DELETE');

export {
    get,
    post,
    put,
    del as delete
}