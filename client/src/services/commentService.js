import * as request from '../utils/request';
const baseUrl = '/data/comments?where='
const endpoints = {
    all: '/data/comments',
    single: (id) => `/data/comments/${id}`,
    search: (id) => encodeURIComponent(`imageId="${id}"`)
}

export const create = async (commentText, imageId) => {
    let comment = {
        comment: commentText,
        author: JSON.parse(localStorage.getItem('user')).username,
        imageId
    }
    const response = await request.post(endpoints.all, comment);
    return response;
};
export const getAllComments = (photoId) => {
    const query = endpoints.search(photoId);
    console.log(query);
    const comments = request.get(baseUrl + query);

    return comments;
};