import { useState, useEffect } from "react";

import { validateFile } from "../utils/validation/validateFile";




export const useFileForm = () => {

    const [preview, setPreview] = useState('');
    const [file, setFile] = useState(null);
    const [fileErrors, setFileErrors] = useState([]);


    useEffect(() => {
        let url;
        if (file) {
            url = URL.createObjectURL(file);
            setPreview(url);
        }
        return () => URL.revokeObjectURL(url);
    }, [file]);



    const onFileChange = (e) => {
        const previewFile = e.target.files[0];
        let errors = validateFile(previewFile);
        setFileErrors(errors);
        console.log(errors);
        if (errors.length === 0) {
            setFile(previewFile);
        }
    };


    return {
        fileErrors,
        preview,
        onFileChange,
        file
    };
}