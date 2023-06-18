import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from '../../contexts/AuthContext';
import { getAllForUser } from "../../services/imageService";
import { remove } from "../../services/imageService";
import styles from './myPhotos.module.css'

export const MyPhotos = () => {
    const { userId } = useContext(AuthContext);
    const [myPhotos, setMyPhotos] = useState([]);
    const [modal, setModal] = useState(false);
    const [photoId, setPhotoId] = useState('');

    useEffect(() => {
        getAllForUser(userId)
            .then(data => {

                setMyPhotos(data.images)
                console.log(data.images.length);
            })
            .catch(err => console.log(err))

    }, [userId])

    const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };

    const toggleModal = (e, id) => {
        e.stopPropagation();
        modal === true ? setPhotoId('') : setPhotoId(id);
        setModal(s => !s);

    }
    const onDeleteClick = async () => {
        await remove(photoId);
        setMyPhotos(p => p.filter(x => x._id !== photoId))
    }

    return (
        <>
            {modal ?
                <div onClick={toggleModal} className={styles.modal}>
                    <div className={styles.content}>

                        <p className={styles.modalText}>Are you sure you want to delete this image? </p>
                        <button onClick={onDeleteClick} className={styles.danger}>Yes</button>
                        <button onClick={toggleModal} className={styles.calm}>No</button>

                    </div>
                </div>
                : <></>
            }
            <div className="container-fluid tm-container-content tm-mt-60">
                <div className="row mb-4">
                    <h2 className="col-6 tm-text-primary">
                        My Photos
                    </h2>

                </div>
                <div className="row tm-mb-90 tm-gallery">
                    {myPhotos.map(i => (
                        <div key={i._id} className="col-2 mb-5">
                            <figure className="effect-ming tm-video-item">
                                <img src={i.resizedUrl} alt="" className="img-fluid" />

                                <figcaption className="d-flex align-items-center justify-content-center">
                                    <h2>{i.title}</h2>
                                    <Link to={`/photos/${i._id}`}>View more</Link>
                                </figcaption>
                                <button onClick={(e) => toggleModal(e, i._id)} className="btn btn-danger rounded">Delete</button>
                            </figure>
                            <div className="d-flex justify-content-between tm-text-gray">

                                <span className="tm-text-gray-light">Added on {new Date(i._createdOn).toLocaleString('en-GB', dateOptions)}</span>
                                <span>Likes: {i.likes ? i.likes : 0} </span>

                            </div>
                        </div>
                    ))}
                </div>
                <div className="row tm-mb-90">
                    <div className="col-12 d-flex justify-content-between align-items-center tm-paging-col">

                        {/* {page.current > 1
                        ? <button name='previous' className="btn btn-primary tm-btn-prev mb-2">Previous</button>
                    : <button className="btn btn-primary tm-btn-prev mb-2 disabled">Previous</button>} */}
                        {/* <div className="tm-paging d-flex">
                    {page.current > 1
                        ? <>
                        <Link to={`/photos/?page=${page.current - 1}`} className="tm-paging-link">{page.current - 1}</Link>
                        <Link className="active tm-paging-link">{page.current}</Link>
                        {page.max > page.current &&
                            <Link to={`/photos/?page=${page.current + 1}`} className="tm-paging-link">{page.current + 1}</Link>
                            
                        }
                        </>
                        : <>
                            <a className="active tm-paging-link">{page.current}</a>
                            {page.max > page.current &&
                                <a className="tm-paging-link">{page.current + 1}</a>
                                
                            }
                            </>
                        }
                        
                    </div> */}
                        {/* <form onSubmit={onPageSubmit} class="tm-text-primary">
                        Page <input  type="text" defaultValue={page.current} size="1" class="tm-input-paging tm-text-primary" /> of {page.max}
                    </form> */}


                        {/* {page.current === page.max
                        ? <button className="btn btn-primary tm-btn-next disabled">Next Page</button>
                    : <button name='next' onClick={onChangePageClick} className="btn btn-primary tm-btn-next">Next Page</button>} */}


                    </div>
                </div>
            </div>
        </>
    );
};