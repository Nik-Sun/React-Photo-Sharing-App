import { useState, useEffect } from "react";

import { validateFile } from "../utils/validation/validateFile";




export const useFileForm = () => {

    const [preview, setPreview] = useState('');
    const [file, setFile] = useState(null);
    const [fileErrors, setFileErrors] = useState([]);
    const [autoTags, setAutoTags] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);


    useEffect(() => {
        let url;
        if (file) {
            var formData = new FormData();
            formData.append('image', file)
            fetch('https://localhost:7127/api/tags', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    setAutoTags(data)
                    url = URL.createObjectURL(file)
                    setPreview(url);
                    setImageLoading(false);
                })


        }
        return () => URL.revokeObjectURL(url);
    }, [file]);



    const onFileChange = (e) => {
        setImageLoading(true);
        const previewFile = e.target.files[0];
        let errors = validateFile(previewFile);
        setFileErrors(errors);
        if (errors.length === 0) {
            setFile(previewFile);
        } else {
            setImageLoading(false)
        }
    };


    return {
        fileErrors,
        preview,
        onFileChange,
        file,
        autoTags,
        setAutoTags,
        imageLoading,
    };
}