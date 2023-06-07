const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
const maxFileSize = 5242880;

export const validateFile = (file) => {
    let errors = [];
    if (allowedFileTypes.indexOf(file.type) === -1) {
        errors.push('The chosen file type is not supported');
    }
    if (file.size > maxFileSize) {
        errors.push('File exceeds maximum file size of 5MB')
    }
    return errors;
};