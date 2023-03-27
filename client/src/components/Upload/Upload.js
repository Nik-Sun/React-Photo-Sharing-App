import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { validateFile } from '../../utils/validation/validateFile'
import { uploadFile } from '../../utils/uploadFile'
import { create } from '../../services/imageService';

export const Upload = () => {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [titleInput, setTitleInput] = useState('');
    const [spinner, setSpinner] = useState(false);

    const [file, setFile] = useState(null);
    const [fileErrors, setFileErrors] = useState([]);
    const [preview, setPreview] = useState(null);


    useEffect(() => {
        console.log('useEffect Fired!!!')
        if (file) {
            setPreview(URL.createObjectURL(file))
            console.log(file);
        }
        return () => {
            URL.revokeObjectURL(preview);
            setPreview(null);
        };
    }, [file])

    function tagsHandler(e) {
        e.preventDefault();
        if (e.key === ' ' || e.key === 'Enter') {
            setTags(tags => [...tags, tagInput])
            setTagInput('');
        } else if (e.key === 'Backspace') {
            setTagInput(val => val.slice(0, val.length - 1))
        } else if (e.key.length === 1) {
            setTagInput(val => val + e.key)
        }
    }

    function handleFilePreview(e) {
        const previewFile = e.target.files[0];
        let errors = validateFile(previewFile);
        setFileErrors(errors);
        console.log(errors);
        if (errors.length === 0) {

            setFile(previewFile);
            setFileErrors([]);
        }
        else { setFile(null) }
    }

    function removeTag(index) {
        setTags(tags => tags.filter((x, i) => i !== index))
    }

    function titleInputHandler(e) {
        setTitleInput(e.target.value)
    }

    async function submitHandler(e) {
        e.preventDefault();
        if (file !== null && titleInput !== '' && tags.length > 0) {

            setSpinner(true);
            let data = await uploadFile(file);
            data.title = titleInput;
            data.tags = tags;

            await create(data);
            setSpinner(false);
            navigate('/');
        }
        else {
            console.log('Errors');
        }
    }


    return (



        <div className='row tm-mb-50 ml-5 mr-0'>
            <div className="col-lg-4 col-12 mt-5">
                <h2 className="tm-text-primary mb-5">Upload picture</h2>
                <form onSubmit={submitHandler} method="POST" className="tm-contact-form mx-auto">
                    <div className="form-group">
                        <input onChange={titleInputHandler} value={titleInput} type="text" name="title" className="form-control rounded-0" placeholder="Title" required />
                    </div>

                    <div className="form-group">
                        <div className="tags-input-container form-control rounded-0">
                            {tags.length > 0 ?
                                tags.map((t, i) => (

                                    <div key={i} className="tag-item">
                                        <span className="text">{t}</span>
                                        <span onClick={() => removeTag(i)} className="close">&times;</span>
                                    </div>

                                )) : 'Add tag in the field below'}
                        </div>
                    </div>
                    <div className="form-group">
                        <input value={tagInput} onKeyDown={tagsHandler} type="text" name="tags" className="form-control rounded-0" placeholder="Image Tags" />
                    </div>


                    <div className='form-group'>
                        <input className='form-control rounded-0' type="file" onChange={handleFilePreview} />
                    </div>

                    <div className="form-group tm-text-right">
                        {spinner ? <div class="lds-dual-ring"></div> : <button type="submit" className="btn btn-primary">Upload</button>}
                    </div>
                </form>

            </div>
            <div className="col-lg-8 col-12 mt-5">
                <h2 className="tm-text-primary mb-5">Image preview</h2>
                <div className='img-preview-container' >
                    {fileErrors.length > 0
                        ? fileErrors.map((err, i) => <p key={i} className='text-danger'>{err}</p>)
                        : file === null
                            ? <>
                                <p>No image chosen yet.Choose an image... </p>
                                <p>Allowed types are: .JPG .JPEG .PNG </p>
                                <p>Maximum file size 5MB </p>
                            </>

                            : <img className="img-preview" src={preview} alt="" />}

                </div>
            </div>
        </div>

    );
}