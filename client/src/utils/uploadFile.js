
const url = 'http://api.cloudinary.com/v1_1/ddhwtoy0m/image/upload';
const uploadPreset = 'lhadeasc';



export const uploadFile = async (file) => {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'photo-sharing-app');


    let response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        let data = response.json();
        return data;
    }


};