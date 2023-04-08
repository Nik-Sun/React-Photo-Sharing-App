import { useEffect, useState } from 'react';
import { create, getAllComments } from '../../../services/commentService';
import { useAuthForm } from '../../../hooks/useAuthForm';
import { useValidateForm } from '../../../hooks/useValidateForm';
import styles from '../photoDetails.module.css'
export const Comments = ({ photoId, isAuthenticated }) => {

    const { formValues, onFormChange, resetForm } = useAuthForm({ comment: '' });
    const { onBlur, isFormValid, errors } = useValidateForm(formValues);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getAllComments(photoId)
            .then(comm => setComments(comm))
    }, [photoId])

    const onCommentAdd = async (e) => {
        e.preventDefault();
        const isValid = isFormValid();
        if (isValid) {
            let created = await create(formValues.comment, photoId);
            setComments(comments => [...comments, created]);
            resetForm();
        }
    }

    return (

        <div className={styles.commentSection}>
            {isAuthenticated &&
                <div className={styles.section} >
                    <h2 className={styles.sectionTitle}>Leave a comment</h2>
                    <div className={styles.sectionForm}>
                        <form onSubmit={onCommentAdd} className={styles.form}>
                            <div className="form-group">
                                <textarea onBlur={onBlur} value={formValues.comment} onChange={onFormChange} className={styles.formInput} name="comment" placeholder="Comment" />
                                <span className='text-danger'>{errors.comment.errorMsg}</span>
                            </div>

                            <div class="form-group tm-text-right">
                                <button type="submit" class="btn btn-primary">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Comments</h2>
                <div className={styles.sectionComments} >


                    {comments.length > 0 ?
                        comments.map(c => <div className={styles.commentItem}>
                            <p>{c.comment}</p>
                            <span className={styles.commentAuthor}>{c.author}</span>
                        </div>)
                        : <div className={styles.noComments}>
                            <p>No one commented on this image yet!</p>

                        </div>
                    }


                    {/* <div className={styles.commentItem}>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <span className={styles.commentAuthor}>Author</span>
                        </div>
                        <div className={styles.commentItem}>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, ducimus?</p>
                            <span className={styles.commentAuthor}>Author</span>
                        </div><div className={styles.commentItem}>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eaque nesciunt architecto animi quisquam. Earum cupiditate sunt amet magnam numquam.Lorem ipsum.</p>
                            <span className={styles.commentAuthor}>Author</span>
                        </div> */}
                </div>
            </div>

        </div>

    );
}