import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOne } from '../../services/imageService'
export const PhotoDetail = () => {

    const { photoId } = useParams();
    const [photo, setPhoto] = useState({});
    useEffect(() => {
        getOne(photoId)
            .then(data => {
                console.log(data)
                setPhoto(data)
            })
    }, [])


    return (
        <div className="container-fluid tm-container-content tm-mt-60">
            <div className="row mb-4">
                <h2 className="col-12 tm-text-primary">{photo.title}</h2>
            </div>
            <div className="row tm-mb-90">
                <div className="col-xl-8 col-lg-7 col-md-6 col-sm-12">
                    <img src={photo.eager[0].url} alt="Image" className="img-fluid" />
                </div>
                <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
                    <div className="tm-bg-gray tm-video-details">
                        <p className="mb-4">
                            Please support us by making <a href="https://paypal.me/templatemo" target="_parent" rel="sponsored">a PayPal donation</a>. Nam ex nibh, efficitur eget libero ut, placerat aliquet justo. Cras nec varius leo.
                        </p>
                        <div className="text-center mb-5">
                            <a href="#" className="btn btn-primary tm-btn-big">Download</a>
                        </div>
                        <div className="mb-4 d-flex flex-wrap">
                            <div className="mr-4 mb-2">
                                <span className="tm-text-gray-dark">Dimension: </span><span className="tm-text-primary">1920x1080</span>
                            </div>
                            <div className="mr-4 mb-2">
                                <span className="tm-text-gray-dark">Format: </span><span className="tm-text-primary">JPG</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <h3 className="tm-text-gray-dark mb-3">License</h3>
                            <p>Free for both personal and commercial use. No need to pay anything. No need to make any attribution.</p>
                        </div>
                        <div>
                            <h3 className="tm-text-gray-dark mb-3">Tags</h3>
                            {/* {photo.tags.map(x => <p className="tm-text-primary mr-4 mb-2 d-inline-block">{x}</p>)} */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                <h2 className="col-12 tm-text-primary">
                    Related Photos
                </h2>
            </div>
            <div className="row mb-3 tm-gallery">
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
            </div>
        </div>
    )
}