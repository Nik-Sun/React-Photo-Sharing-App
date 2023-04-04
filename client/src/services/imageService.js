import { uploadFile } from '../utils/uploadFile'
import * as request from '../utils/request'

const baseUrl = 'http://localhost:3030/data/images';

const endpoints = {
    all: '/data/images',
    single: (id) => `/data/images/${id}`,
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
    let response = await request.post(endpoints.all, newObj);
    console.log(response);
};

export const getAll = async () => {
    let response = await fetch(baseUrl);
    let data = await response.json();

    return Object.values(data);
};

export const getOne = async (id) => {

    let data = await request.get(endpoints.single(id));
    return data;
};

export const remove = async (id) => {
    let data = await request.delete(endpoints.single(id));
    return data;
}