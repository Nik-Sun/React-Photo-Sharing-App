import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useFileForm } from '../../hooks/useFileForm';
import { useAuthForm } from '../../hooks/useAuthForm';
import { useValidateForm } from '../../hooks/useValidateForm';
import { create } from '../../services/imageService';
export const Upload = () => {
    const navigate = useNavigate();

    const { formValues, onFormChange } = useAuthForm({ title: '', });
    const {
        fileErrors,
        preview,
        onFileChange,
        file
    } = useFileForm();

    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [spinner, setSpinner] = useState(false);
    const { errors, isFormValid, onBlur } = useValidateForm({ ...formValues, preview, tags });



    const removeTag = (index) => {
        setTags(tags => tags.filter((x, i) => i !== index))
    };

    const tagsHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setTags(tags => [...tags, tagInput]);
            setTagInput('');
            onBlur(e);
        }
    };

    async function submitHandler(e) {
        e.preventDefault();
        let isValid = isFormValid();
        console.log(isValid)
        if (isValid) {

            setSpinner(true);
            let image = await create(file, formValues.title, tags);
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

                    <div className='form-group'>
                        <input className='form-control rounded-0' type="file" name='preview' onChange={onFileChange} />
                    </div>

                    <div className="form-group">
                        <input onChange={onFormChange} onBlur={onBlur} value={formValues.title} type="text" name="title" className="form-control rounded-0" placeholder="Title" required />
                        <span className='text-danger'>{errors.title.error}</span>
                    </div>


                    <div className="form-group">
                        <div className="tags-input-container form-control rounded-0">
                            {tags.length > 0 ?
                                tags.map((t, i) => (

                                    <div key={i} className="tag-item">
                                        <span className="text">{t}</span>
                                        <span onClick={() => removeTag(i)} className="close">&times;</span>
                                    </div>

                                )) : 'Add tag in the field below and press Enter'}

                        </div>
                        <span className='text-danger'>{errors.tags.error}</span>
                    </div>
                    <div className="form-group">
                        <input value={tagInput} onKeyDown={tagsHandler} onBlur={onBlur} onChange={(e) => setTagInput(e.target.value)} type="text" name="tags" className="form-control rounded-0" placeholder="Image Tags" />
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
                        : preview === ''
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