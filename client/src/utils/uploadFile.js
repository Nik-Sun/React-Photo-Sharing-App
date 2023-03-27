import * as request from './request'
const url = 'http://api.cloudinary.com/v1_1/ddhwtoy0m/image/upload';
const uploadPreset = 'lhadeasc';



export const uploadFile = async (file) => {
    let formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset',uploadPreset);
    formData.append('folder','photo-sharing-app');

    
    let data = await request.post(url,formData)
    return data;
    
};