
import { getAllForUser, getRelated } from "../../../services/imageService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const RelatedPhotos = ({ tags, photoId }) => {
    const [relatedPhotos, setRelatedPhotos] = useState([]);


    useEffect(() => {


        getRelated(tags)
            .then(data => setRelatedPhotos(data))
            .catch(err => console.log(err));

    }, [tags])

    const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };

    return (
        <>
            <div className="row mb-4">
                <h2 className="col-12 tm-text-primary">
                    Related Photos
                </h2>
            </div>
            <div className="row mb-3 tm-gallery">

                {relatedPhotos.filter(x => x._id !== photoId).map((x, i) => {
                    return <div key={i} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                        <figure className="effect-ming tm-video-item">
                            <img src={x.resizedUrl} alt="Image" className="img-fluid" />
                            <figcaption className="d-flex align-items-center justify-content-center">
                                <h2>{x.title}</h2>
                                <Link to={`/photos/${x._id}`}>View more</Link>
                            </figcaption>
                        </figure>
                        <div className="d-flex justify-content-between tm-text-gray">
                            <span className="tm-text-gray-light">Added on {new Date(x._createdOn).toLocaleString('en-GB', dateOptions)}</span>
                        </div>
                    </div>
                })}




            </div>
        </>

        /* <div className="row mb-3 tm-gallery">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                <figure className="effect-ming tm-video-item">
                    <img src="img/img-01.jpg" alt="Image" className="img-fluid" />
                    <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>Hangers</h2>
                        <a href="#">View more</a>
                    </figcaption>
                </figure>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span className="tm-text-gray-light">16 Oct 2020</span>
                    <span>12,460 views</span>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                <figure className="effect-ming tm-video-item">
                    <img src="img/img-02.jpg" alt="Image" className="img-fluid" />
                    <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>Perfumes</h2>
                        <a href="#">View more</a>
                    </figcaption>
                </figure>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span className="tm-text-gray-light">12 Oct 2020</span>
                    <span>11,402 views</span>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                <figure className="effect-ming tm-video-item">
                    <img src="img/img-03.jpg" alt="Image" className="img-fluid" />
                    <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>Clocks</h2>
                        <a href="#">View more</a>
                    </figcaption>
                </figure>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span className="tm-text-gray-light">8 Oct 2020</span>
                    <span>9,906 views</span>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                <figure className="effect-ming tm-video-item">
                    <img src="img/img-04.jpg" alt="Image" className="img-fluid" />
                    <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>Plants</h2>
                        <a href="#">View more</a>
                    </figcaption>
                </figure>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span className="tm-text-gray-light">6 Oct 2020</span>
                    <span>16,100 views</span>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                <figure className="effect-ming tm-video-item">
                    <img src="img/img-05.jpg" alt="Image" className="img-fluid" />
                    <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>Morning</h2>
                        <a href="#">View more</a>
                    </figcaption>
                </figure>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span className="tm-text-gray-light">26 Sep 2020</span>
                    <span>16,008 views</span>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                <figure className="effect-ming tm-video-item">
                    <img src="img/img-06.jpg" alt="Image" className="img-fluid" />
                    <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>Pinky</h2>
                        <a href="#">View more</a>
                    </figcaption>
                </figure>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span className="tm-text-gray-light">22 Sep 2020</span>
                    <span>12,860 views</span>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                <figure className="effect-ming tm-video-item">
                    <img src="img/img-07.jpg" alt="Image" className="img-fluid" />
                    <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>Bus</h2>
                        <a href="#">View more</a>
                    </figcaption>
                </figure>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span className="tm-text-gray-light">12 Sep 2020</span>
                    <span>10,900 views</span>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                <figure className="effect-ming tm-video-item">
                    <img src="img/img-08.jpg" alt="Image" className="img-fluid" />
                    <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>New York</h2>
                        <a href="#">View more</a>
                    </figcaption>
                </figure>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span className="tm-text-gray-light">4 Sep 2020</span>
                    <span>11,300 views</span>
                </div>
            </div>
        </div> */
    );
};