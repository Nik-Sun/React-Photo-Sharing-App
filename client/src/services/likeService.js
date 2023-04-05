import * as request from '../utils/request';
const baseUrl = '/data/likes';
const endpoints = {
    all: '/data/likes',
    count: (id) => `/data/likes?where=${encodeURIComponent(`liked="${id}"`)}`,
    currentUserLike: (photoId, userId) => `/data/likes?where=${encodeURIComponent(`liked="${photoId}" AND _ownerId="${userId}"`)}`,
    likeById: (id) => `/data/likes/${id}`
}


export const addLike = async (photoId) => {
    let like = {
        liked: photoId,
    };
    let response = await request.post(endpoints.all, like);
    return response;
};

export const getAllLikes = async (photoId) => {

    let response = await request.get(endpoints.count(photoId) + '&count');
    return response;
}

export const getMyLike = async (photoId) => {
    const currentUserId = JSON.parse(localStorage.getItem('user'))._id
    let response = await request.get(endpoints.currentUserLike(photoId, currentUserId))
    console.log(response);
    if (response.length === 0) {
        return {};
    }
    return response[0];
}
export const removeLike = async (likeId) => {
    await request.delete(endpoints.likeById(likeId));
};