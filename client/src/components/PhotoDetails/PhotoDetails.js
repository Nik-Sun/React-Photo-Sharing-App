import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { getOne, getRelated, remove } from '../../services/imageService';
import { addLike, getAllLikesById, getMyLike, removeLike } from '../../services/likeService'
import styles from './photoDetails.module.css'
import { Comments } from './Comments/Comments';
import { RelatedPhotos } from './RelatedPhotos/RelatedPhotos';

export const PhotoDetail = () => {
    const navigate = useNavigate();
    const { isOwner, isAuthenticated } = useContext(AuthContext);
    const { photoId } = useParams();
    const [photo, setPhoto] = useState({});
    const [dialog, setDialog] = useState(false);
    const [likes, setLikes] = useState({
        count: 0,
        myLike: {}
    });

    const onLikeAddClick = async () => {
        const like = await addLike(photoId);
        console.log(like)
        setLikes(l => ({
            count: l.count + 1,
            myLike: like
        }));
    };

    const onLikeRemoveClick = async () => {
        await removeLike(likes.myLike._id);
        setLikes(l => ({
            count: l.count - 1,
            myLike: {}
        }));
    }

    useEffect(() => {

        Promise.all([
            getOne(photoId),
            // getAllLikesById(photoId),
            // getMyLike(photoId),
        ])
            .then(([p, l, ml]) => {
                setPhoto(p)
                // setLikes({ count: l, myLike: ml })
                // console.log(isOwner(photoId));
            }).catch(err => {
                navigate('/');
            })


    }, [photoId, navigate]);

    const onDeleteClick = async (e) => {
        setDialog(dialog => !dialog);

    }
    const onDeleteHandler = async () => {
        await remove(photoId);
        navigate('/photos')
    }




    return (
        <div className="container-fluid tm-container-content tm-mt-60">
            <div className="row mb-4">
                <h2 className="col-12 tm-text-primary">{photo.title}</h2>
            </div>
            <div className="row tm-mb-90">
                <div className="col-xl-8 col-lg-7 col-md-6 col-sm-12">
                    <img src={photo.resizedUrl} alt="Image" className="img-fluid" />
                </div>
                <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
                    <div className="tm-bg-gray tm-video-details">
                        <div className={styles.details}>
                            <p>Uploaded by {photo.uploadedBy}</p>
                            <p>Size {(photo.bytes / 1024 / 1024).toFixed(2)} MB</p>

                            {/* <p className={styles.likeCount}> <i className="fas fa-heart"></i>: {likes.count}</p> */}
                        </div>
                        {isAuthenticated &&
                            <div className={styles.likeBtnContainer}>
                                <Link to={photo.downloadUrl} target='_blank' download className={styles.likeBtn}>Download</Link>
                                {/* {isOwner(photo._ownerId) === false
                                    ? <>
                                        {likes.myLike._ownerId
                                            ? <button onClick={onLikeRemoveClick} className={styles.likeBtn}>Remove <i className="far fa-heart"></i></button>
                                            : <button onClick={onLikeAddClick} className={styles.likeBtn}>Add <i className="far fa-heart"></i></button>}
                                    </>
                                    : <></>

                                } */}

                            </div>

                        }

                        {isAuthenticated && isOwner(photo.ownerId)
                            ? <>
                                {dialog
                                    ? <div className={styles.modal}>

                                        <p className={styles.modalP}>Are you sure you want to delete this image? </p>
                                        <button onClick={onDeleteHandler} className={styles.danger}>Yes</button>
                                        <button onClick={onDeleteClick} className={styles.calm}>No</button>

                                    </div>

                                    : <div className="text-center mb-5">
                                        <button onClick={onDeleteClick} className="btn btn-danger">Delete</button>
                                    </div>}
                                <div className="text-center mb-5">
                                    {/* {likes.find(x => isOwner(x) === true)
                                        ? <button className={styles.likeBtn}>Remove <i className="far fa-heart"></i></button>
                                        : <button onClick={onLikeAddClick} className={styles.likeBtn}>Add <i className="far fa-heart"></i></button>
                                    } */}


                                </div>
                            </>
                            : ''


                        }

                        <div className="mb-4 d-flex flex-wrap">
                            <div className="mr-4 mb-2">
                                <span className="tm-text-gray-dark">Dimension: </span><span className="tm-text-primary">{photo.width} x {photo.height}</span>
                            </div>
                            <div className="mr-4 mb-2">
                                <span className="tm-text-gray-dark">Format: </span><span className="tm-text-primary">{photo.format?.toUpperCase()}</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <h3 className="tm-text-gray-dark mb-3">License</h3>
                            <p>Free for both personal and commercial use. No need to pay anything. No need to make any attribution.</p>
                        </div>
                        <div>
                            <h3 className="tm-text-gray-dark mb-3">Tags</h3>
                            <p className="tm-text-primary mr-4 mb-2 d-inline-block">{photo.tags}</p>
                        </div>

                    </div>

                </div>

            </div>
            <Comments photoId={photoId} isAuthenticated={isAuthenticated} />
            {/* 
            <RelatedPhotos tags={photo.tags} photoId={photoId} /> */}

        </div>
    )
}