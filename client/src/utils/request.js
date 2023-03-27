const baseUrl = 'http://localhost:3030';

async function request(method,target,data){

    let targetUrl = target.startsWith('http')? target : baseUrl + target;

    let options = {
        method,
        headers : {}
    }
    if(data !== undefined){
        if (data instanceof FormData) {
            options.body = data;
        }
        else{
            options.body = JSON.stringify(data);
            options.headers['content-type'] = 'application/json';
        }
       
    }
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
        options.headers['X-Authorization'] = user.accessToken;
    }
    try {
        let response = await fetch(targetUrl,options);
        if(response.ok === false){
           let error = await response.json();
           throw new Error(error.message)
        }
        if(response.status === 204){
            return response;
        }else {
            return response.json();
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
}
const get = request.bind({},'GET');
const post = request.bind({},'POST');
const put = request.bind({},'PUT');
const del = request.bind({},'DELETE');

export {
    get,
    post,
    put,
    del as delete
}