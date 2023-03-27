const baseUrl = 'http://localhost:3030/jsonstore/images'

export const create = async (data) => {

    let response = await fetch(baseUrl,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(data)
    });

    let repsonseData = await response.json();
    return repsonseData;

}
export const getAll = async () => {
    let response = await fetch(baseUrl);
    let data = await response.json();
    console.log(Object.values(data));
    return Object.values(data);
}