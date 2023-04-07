import { useState, useEffect } from 'react';
import { getAll, search } from '../../services/imageService';
import { Link, useSearchParams } from 'react-router-dom';



export const PhotosList = () => {


    const [searchParams, setSearchParams] = useSearchParams();

    const [pageImages, setPageImages] = useState([]);
    const [page, setPage] = useState({
        max: 1,
        current: 1
    });


    // useEffect(() => {
    //     getAll()
    //         .then(data => setPageImages(data))
    // }, []);

    useEffect(() => {
        console.log('useEffect fire!!!');
        const searchQuery = searchParams.get('search');
        const pageQuery = Number(searchParams.get('page'));

        const pageNum = pageQuery ? pageQuery : 1;
        console.log(pageNum);
        if (searchQuery) {
            search(searchQuery, pageNum)
                .then(data => {
                    setPage({
                        max: Math.ceil(data.count / 8),
                        current: pageNum
                    });
                    setPageImages(data.response)
                });
        } else {
            getAll(pageNum)
                .then(data => {
                    setPage({
                        max: Math.ceil(data.count / 8),
                        current: pageNum
                    });
                    setPageImages(data.response)
                });
        }


    }, [searchParams]);


    const onNextPageClick = () => {
        const pageQuery = Number(searchParams.get('page'));
        const searhQuery = searchParams.get('search');

        const pageNum = pageQuery ? pageQuery : 1;
        const newPage = pageNum + 1;
        const newParams = {
            'search': searhQuery,
            'page': newPage
        }
        setSearchParams(newParams)

    };

    return (
        <div className="container-fluid tm-container-content tm-mt-60">
            <div className="row mb-4">
                <h2 className="col-6 tm-text-primary">
                    Latest Photos
                </h2>

            </div>
            <div className="row tm-mb-90 tm-gallery">
                {pageImages.map(i => (
                    <div key={i._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                        <figure className="effect-ming tm-video-item">
                            <img src={i.resizedUrl} alt="" className="img-fluid " />
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
                    {page.current > 1
                        ? <button className="btn btn-primary tm-btn-prev mb-2">Previous</button>
                        : <button className="btn btn-primary tm-btn-prev mb-2 disabled">Previous</button>}

                    {/* <div className="tm-paging d-flex">
                        <a className="active tm-paging-link">1</a>
                        <a className="tm-paging-link">2</a>
                        <a className="tm-paging-link">3</a>
                        <a className="tm-paging-link">4</a>
                    </div> */}
                    {page.current === page.max
                        ? <button className="btn btn-primary tm-btn-next disabled">Next Page</button>
                        : <button onClick={onNextPageClick} className="btn btn-primary tm-btn-next">Next Page</button>}


                </div>
            </div>
        </div>
    );
}