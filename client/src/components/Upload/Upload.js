import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import { useFileForm } from '../../hooks/useFileForm';

import { useAuthForm } from '../../hooks/useAuthForm';
import { useValidateForm } from '../../hooks/useValidateForm';
import { create } from '../../services/imageService';

import styles from './upload.module.css';

export const Upload = () => {
    const navigate = useNavigate();
    const { formValues, onFormChange } = useAuthForm({ title: '', });
    const {
        preview,
        onFileChange,
        file,
        autoTags,
        imageLoading,
        Toaster,
        tags,
        onSuggestedTagClick,
        removeTag,
        validateOnSubmit
    } = useFileForm();


    const [spinner, setSpinner] = useState(false);
    const { validateForm } = useValidateForm({ ...formValues });



    // const onTagsChange = (e) => {
    //     const value = e.target.value;
    //     setTags(t => ({ ...t, current: value }));
    // }

    // const onTagAdd = (e) => {
    //     if (e.key === 'Enter') {
    //         e.preventDefault();
    //         const newTag = e.target.value;

    //         if (newTag.length < 3) {
    //             setTags(t => ({ ...t, error: 'Tag must be at least 3 chars' }));
    //             return;
    //         }
    //         const newTagsState = { current: '', added: ([...tags.added, newTag]), error: '' }
    //         setTags(newTagsState);

    //     }
    // };

    // const onTagsBlur = () => {
    //     if (tags.added.length === 0) {
    //         setTags(t => ({ ...t, error: 'Add at least one tag' }))
    //     }
    // }


    async function submitHandler(e) {
        e.preventDefault();
        const validForm = validateForm();
        const validPreviewAndTags = validateOnSubmit();

        if (validForm && validPreviewAndTags) {
            try {
                setSpinner(true);
                await create(file, formValues.title, tags.join(' '));
                navigate('/photos');
            } catch (error) {
                alert(error)
            } finally { setSpinner(false); }

        }
        else {
            console.log('Errors');
        }
    }

    return (



        <div className='row tm-mb-50 ml-5 mr-0'>
            <Toaster />
            <div className="col-lg-4 col-12 mt-5">
                <h2 className="tm-text-primary mb-5">Upload picture</h2>
                <form onSubmit={submitHandler} method="POST" className="tm-contact-form mx-auto">

                    <div className='form-group'>
                        <input className='form-control rounded-0' type="file" name='preview' onChange={onFileChange} />
                    </div>

                    <div className="form-group">
                        <input onChange={onFormChange} value={formValues.title} type="text" name="title" className="form-control rounded-0" placeholder="Title" />

                    </div>

                    {preview && <div className="form-group">
                        <label>Suggested Tags:</label>
                        <div className="tags-input-container form-control rounded-0">
                            {autoTags.length > 0 ?
                                autoTags.map((t, i) => (

                                    <div onClick={() => onSuggestedTagClick(i)} key={i} className={styles.tagItemSuggested}>
                                        <span className="text">{t}</span>
                                    </div>

                                )) : 'Suggested tags...'}

                        </div>
                        <span className='text-danger'>{ }</span>
                    </div>}
                    {tags.length > 0

                        ? <div className="form-group">
                            <div className="tags-input-container form-control rounded-0">
                                {tags.map((t, i) => (
                                    <div key={i} className="tag-item">
                                        <span className="text">{t}</span>
                                        <span onClick={() => removeTag(i)} className="close">&times;</span>
                                    </div>))
                                }
                            </div>
                        </div>
                        : <></>}
                    {/* <div className="form-group">
                        <div className="tags-input-container form-control rounded-0">
                            {tags.added.length > 0 ?
                                tags.added.map((t, i) => (

                                    <div key={i} className="tag-item">
                                        <span className="text">{t}</span>
                                        <span onClick={() => removeTag(i)} className="close">&times;</span>
                                    </div>

                                )) : 'Add tag in the field below and press Enter'}

                        </div>
                        <span className='text-danger'>{tags.error}</span>
                    </div> */}
                    {/* <div className="form-group">
                        <input value={tags.current} onBlur={onTagsBlur} onChange={onTagsChange} onKeyDown={onTagAdd} type="text" name="tags" className="form-control rounded-0" placeholder="Image Tags" />
                    </div> */}



                    <div className="form-group tm-text-right">
                        {spinner ? <div className="lds-dual-ring"></div> : <button type="submit" className="btn btn-primary">Upload</button>}
                    </div>
                </form>

            </div>
            <div className="col-lg-8 col-12 mt-5">
                <h2 className="tm-text-primary mb-5">Image preview</h2>

                <div className='img-preview-container' >
                    {imageLoading ? <span className={styles.loader}></span>
                        : <>


                            {preview === ''
                                ? <>
                                    <p>No image chosen yet.Choose an image... </p>
                                    <p>Allowed types are: .JPG .JPEG .PNG </p>
                                    <p>Maximum file size 5MB </p>
                                </>

                                : <img className="img-preview" src={preview} alt="" />}

                        </>
                    }

                </div>

                <p className="tm-text-primary mb-5">Powered by <Link to={'https://www.imagga.com'}>Imagga</Link></p>
            </div>
        </div>

    );
}