import { useState, useEffect } from 'react';
import { getAll } from '../../services/imageService';
import { Link } from 'react-router-dom';


export const PhotosList = () => {

    const [pageImages, setPageImages] = useState([]);

    useEffect(() => {
        getAll()
            .then(data => setPageImages(data))
    }, []);

    return (
        <div className="container-fluid tm-container-content tm-mt-60">
            <div className="row mb-4">
                <h2 className="col-6 tm-text-primary">
                    Latest Photos
                </h2>
                <div className="col-6 d-flex justify-content-end align-items-center">
                    <form action="" className="tm-text-primary">
                        Page <input type="text" value="1" size="1" className="tm-input-paging tm-text-primary" /> of 200
                    </form>
                </div>
            </div>
            <div className="row tm-mb-90 tm-gallery">
                {pageImages.map(i => (
                    <div key={i._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                        <figure className="effect-ming tm-video-item">
                            <img src={i.eager[0].url} alt="" className="img-fluid " />
                            <figcaption className="d-flex align-items-center justify-content-center">
                                <h2>{i.title}</h2>
                                <Link to={`/photos/${i._id}`}>View more</Link>
                            </figcaption>
                        </figure>
                        <div className="d-flex justify-content-between tm-text-gray">
                            <span className="tm-text-gray-light">{i.created_at}</span>
                            <span>9,906 views</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row tm-mb-90">
                <div className="col-12 d-flex justify-content-between align-items-center tm-paging-col">
                    <a href="/" className="btn btn-primary tm-btn-prev mb-2 disabled">Previous</a>
                    <div className="tm-paging d-flex">
                        <a href="/" className="active tm-paging-link">1</a>
                        <a href="/" className="tm-paging-link">2</a>
                        <a href="/" className="tm-paging-link">3</a>
                        <a href="/" className="tm-paging-link">4</a>
                    </div>
                    <a href="/" className="btn btn-primary tm-btn-next">Next Page</a>
                </div>
            </div>
        </div>
    );
}