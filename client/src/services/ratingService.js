import * as request from '../utils/request';

const enpoints = {
    getMyVote: (imageId) => `/rating?imageId=${imageId}`,
    addVote: `/rating`
}



const addVote = async (vote) => {
    let response = await request.post(enpoints.addVote, vote);
    return response;
}

const getVote = async (imageId) => {
    let response = await request.get(enpoints.getMyVote(imageId));
    return response;
}
export { addVote, getVote }