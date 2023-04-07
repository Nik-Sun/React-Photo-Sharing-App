import { uploadFile } from '../utils/uploadFile'
import * as request from '../utils/request'

const baseUrl = 'http://localhost:3030/data/images';
const viewsUrl = 'http://localhost:3030/jsonstore/views';

const endpoints = {
    all: '/data/images',
    single: (id) => `/data/images/${id}`,
    searchPaged: (query, offset) => baseUrl + `?where=tags%20LIKE%20%22${query}%22&offset=${offset}&pageSize=8`,
    allPaged: (offset) => `/data/images?offset=${offset}&pageSize=8`,
    searchCount: (query) => baseUrl + `?where=tags%20LIKE%20%22${query}%22&count`,
    allCount: '/data/images?count'

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

    let response = await request.post(endpoints.all, newObj);
};

export const getAll = async (page = 1) => {
    if (page) {
        const response = await request.get(endpoints.allPaged((page * 8) - 8));
        const count = await request.get(endpoints.allCount);
        console.log(count);
        return {
            response,
            count
        };
    }
    // let response = await fetch(baseUrl);
    // let data = await response.json();

    // return Object.values(data);
};

export const getOne = async (id) => {
    let data = await request.get(endpoints.single(id));
    return data;
};

export const remove = async (id) => {
    let data = await request.delete(endpoints.single(id));
    return data;
}

export const search = async (query, page) => {
    console.log(query, page);
    const response = await request.get(endpoints.searchPaged(query, (page * 8) - 8));
    const count = await request.get(endpoints.searchCount(query));
    console.log(query, count);
    return {
        response,
        count
    }
}