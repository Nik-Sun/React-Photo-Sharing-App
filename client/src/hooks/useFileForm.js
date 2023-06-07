import { useState, useEffect } from "react";
import { useContext } from 'react';

import { autoTagging } from '../services/imageService'
import { ToastContext } from '../contexts/ToastContext';
import { validateFile } from "../utils/validation/validateFile";



export const useFileForm = () => {

    const [preview, setPreview] = useState('');
    const [file, setFile] = useState(null);
    const [autoTags, setAutoTags] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);
    const { toast, Toaster } = useContext(ToastContext);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        let url;
        if (file) {
            setImageLoading(true);
            setAutoTags([]);
            autoTagging(file).then(data => {
                let url = URL.createObjectURL(file);
                setPreview(url);
                setAutoTags(data);
            }).catch(err => toast.error(err.title))
                .finally(setImageLoading(false));


        }
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const onSuggestedTagClick = (index) => {
        const tag = autoTags.filter((x, i) => i === index);
        const newTags = autoTags.filter((x, i) => i !== index);
        console.log(tag);
        setAutoTags(newTags)
        setTags(tags => [...tags, tag[0]])
    }

    const removeTag = (index) => {
        const tag = tags.filter((x, i) => i === index);
        const newTags = tags.filter((x, i) => i !== index);
        setTags(newTags);
        console.log(tag);
        setAutoTags(t => [...t, tag[0]]);
    };

    const onFileChange = (e) => {
        setImageLoading(true);
        const previewFile = e.target.files[0];
        let errors = validateFile(previewFile);

        if (errors.length === 0) {
            setFile(previewFile);
        } else {
            errors.forEach(e => toast.error(e))
            setImageLoading(false)
        }
    };
    const validateTags = () => {
        if (tags.length > 0) {
            return true;
        } else if (tags.length === 0 && preview === '') {
            return false;
        } else {
            toast.error('Choose at least one tag');
            return false;
        }
    }
    const validatePreview = () => {
        if (preview !== '') {
            return true;
        } else {
            toast.error("There is no image selected");
            return false;
        }
    };
    const validateOnSubmit = () => {
        return validatePreview() && validateTags();
    }


    return {
        Toaster,
        preview,
        onFileChange,
        file,
        autoTags,
        imageLoading,
        tags,
        removeTag,
        onSuggestedTagClick,
        validateOnSubmit,
    };
}