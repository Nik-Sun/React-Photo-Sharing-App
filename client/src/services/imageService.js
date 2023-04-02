import { uploadFile } from '../utils/uploadFile'
import * as request from '../utils/request'

const baseUrl = 'http://localhost:3030/data/images';

const endpoints = {
    create: '/data/images',
    getOne: (id) => `/data/images/${id}`,
}

export const create = async (file, titleInput, tagsInput) => {
    let data = await uploadFile(file);
    data.title = titleInput;
    data.tags = tagsInput;
    const { title, url, bytes, tags, format, height, width } = data;
    const newObj = {
        title,
        orgiginalUrl: url,
        bytes,
        tags,
        format,
        height,
        width,
        uploadedBy: JSON.parse(localStorage.getItem('user')).username
    };
    newObj.resizedUrl = data.eager[0].url;
    newObj.downloadUrl = data.eager[1].url;
    console.log(data);
    console.log(newObj);
    let response = await request.post(endpoints.create, newObj);
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
    console.log(ep);
    let data = await request.get(ep);
    return data;
}