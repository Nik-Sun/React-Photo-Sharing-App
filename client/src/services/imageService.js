import { uploadFile } from '../utils/uploadFile'
import * as request from '../utils/request'
import { getAllLikes } from './likeService';

const baseUrl = 'http://localhost:3030/data/images';

const endpoints = {
    all: '/images',
    tags: '/tags',
    single: (id) => `/images/${id}`,
    searchPaged: (query, offset) => baseUrl + `?where=tags%20LIKE%20%22${query}%22&offset=${offset}&pageSize=8`,
    allPaged: (page) => `/images/?page=${page}`,
    searchCount: (query) => baseUrl + `?where=tags%20LIKE%20%22${query}%22&count`,
    allCount: '/data/images?count',
    related: (tags) => baseUrl + `?where=tags%20LIKE%20%22${tags[0]}%22${tags.map(t => `%20OR%20tags%20LIKE%20%22${t}%22`).join('')}`,
    allForUser: (id) => `/data/images?where=_ownerId%3D%22${id}%22`

}
export const autoTagging = async (imageFile) => {
    var formData = new FormData();
    formData.append('image', imageFile);
    return await request.post(endpoints.tags, formData);

}
export const create = async (file, titleInput, tagsInput) => {
    let formData = new FormData();
    formData.append('imageFile', file);
    formData.append('title', titleInput);
    formData.append('tags', tagsInput);
    let response = await request.post(endpoints.all, formData);
};

export const getAll = async (page = 1) => {

    const response = await request.get(endpoints.allPaged(page));
    return {
        ...response
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