import { uploadFile } from '../utils/uploadFile'
import * as request from '../utils/request'

const baseUrl = 'http://localhost:3030/data/images';

const endpoints = {
    create: '/data/images',
    getOne: (id) => `/data/images/${id}`,
}

export const create = async (file, title, tags) => {
    let data = await uploadFile(file);
    data.title = title;
    data.tags = tags;

    let response = await request.post(endpoints.create, data);
    console.log(response);

    // let response = await fetch(baseUrl, {
    //     method: 'POST',
    //     headers: {
    //         'content-type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // });

    // let repsonseData = await response.json();
    // return repsonseData;

}
export const getAll = async () => {
    let response = await fetch(baseUrl);
    let data = await response.json();

    return Object.values(data);
}
export const getOne = async (id) => {
    let ep = endpoints.getOne(id);

    let data = await request.get(ep);
    return data;
}