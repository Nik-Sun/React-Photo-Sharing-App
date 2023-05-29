import * as request from '../utils/request';
const baseUrl = '/data/comments?where='
const endpoints = {
    base: '/comments',
    all: (id) => `/comments?imageId=${id}`,
    single: (id) => `/api/comments/${id}`,
    search: (id) => encodeURIComponent(`imageId="${id}"`)
}

export const create = async (commentText, imageId) => {
    let comment = {
        content: commentText,
        imageId
    }
    const response = await request.post(endpoints.base, comment);
    return response;
};
export const getAllComments = (photoId) => {
    const query = endpoints.search(photoId);
    console.log(query);
    const comments = request.get(endpoints.all(photoId));

    return comments;
};