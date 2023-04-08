import { uploadFile } from '../utils/uploadFile'
import * as request from '../utils/request'
import { getAllLikes } from './likeService';

const baseUrl = 'http://localhost:3030/data/images';
const viewsUrl = 'http://localhost:3030/jsonstore/views';

const endpoints = {
    all: '/data/images',
    single: (id) => `/data/images/${id}?load=uploadedBy%3D_ownerId%3Ausers`,
    searchPaged: (query, offset) => baseUrl + `?where=tags%20LIKE%20%22${query}%22&offset=${offset}&pageSize=8`,
    allPaged: (offset) => `/data/images?offset=${offset}&pageSize=8`,
    searchCount: (query) => baseUrl + `?where=tags%20LIKE%20%22${query}%22&count`,
    allCount: '/data/images?count',
    related: (tags) => baseUrl + `?where=tags%20LIKE%20%22${tags[0]}%22${tags.map(t => `%20OR%20tags%20LIKE%20%22${t}%22`).join('')}`,
    allForUser: (id) => `/data/images?where=_ownerId%3D%22${id}%22`

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
        const likes = await getAllLikes();

        for (const image of response) {
            image.likes = likes.filter(l => l.liked === image._id).length;

        }
        console.log(response);
        return {
            response,
            count
        };
    }

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

export const getRelated = async (tags) => {
    const tagsArray = tags.split(' ');
    const response = await request.get(endpoints.related(tagsArray));
    return response;
}

export const getAllForUser = async (userId) => {
    const response = await request.get(endpoints.allForUser(userId));
    return response;
}