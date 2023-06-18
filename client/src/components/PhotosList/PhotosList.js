import { useState, useEffect, useRef } from 'react';
import { getAll, search } from '../../services/imageService';
import { Link, useSearchParams } from 'react-router-dom';



export const PhotosList = () => {


    const [searchParams, setSearchParams] = useSearchParams();
    const [pageImages, setPageImages] = useState([]);
    const [page, setPage] = useState({
        max: 1,
        current: 1
    });


    const pageInput = useRef();
    useEffect(() => {
        const searchQuery = searchParams.get('search');
        const pageQuery = Number(searchParams.get('page'));

        const pageNum = pageQuery ? pageQuery : 1;
        if (searchQuery) {
            search(searchQuery, pageNum)
                .then(data => {
                    setPage({
                        max: data.currentCount !== 0 ? Math.ceil(data.currentCount / 8) : 1,
                        current: pageNum
                    });
                    setPageImages(data.images)
                });
        } else {
            getAll(pageNum)
                .then(data => {

                    setPage({
                        max: Math.ceil(data.totalCount / 8),
                        current: pageNum
                    });
                    setPageImages(data.images)
                }).catch(err => console.log(err));
        }


    }, [searchParams]);



    const onChangePageClick = (e) => {
        const btnName = e.target.name;
        const pageQuery = Number(searchParams.get('page'));
        const searhQuery = searchParams.get('search');

        const pageNum = pageQuery ? pageQuery : 1;
        let newPage = pageNum;

        btnName === 'next' ? newPage++ : newPage--;

        let newParams = {
            page: newPage,
        };
        if (searhQuery) {
            newParams.search = searhQuery;
        }

        setSearchParams(newParams)

    };

    const onPageSubmit = (e) => {
        e.preventDefault();

        const searhQuery = searchParams.get('search');

        const pageNum = pageInput.current.value;
        console.log(pageNum)
        let newPage = pageNum;

        let newParams = {
            page: newPage,
        };
        if (searhQuery) {
            newParams.search = searhQuery;
        }

        setSearchParams(newParams);
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
                    <div key={i.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                        <figure className="effect-ming tm-video-item">
                            <img src={i.resizedUrl} alt="" className="img-fluid " />
                            <figcaption className="d-flex align-items-center justify-content-center">
                                <h2>{i.title}</h2>
                                <Link to={`/photos/${i.id}`}>View more</Link>
                            </figcaption>
                        </figure>
                        <div className="d-flex justify-content-between tm-text-gray">
                            <span className="tm-text-gray-light">Added on {new Date(i.createdOn).toDateString()}</span>
                            <span>Rating: {i.rating} </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row tm-mb-90">
                <div className="col-12 d-flex justify-content-between align-items-center tm-paging-col">

                    {page.current > 1
                        ? <button name='previous' onClick={onChangePageClick} className="btn btn-primary tm-btn-prev mb-2">Previous</button>
                        : <button className="btn btn-primary tm-btn-prev mb-2 disabled">Previous</button>}
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
                    <form onSubmit={onPageSubmit} className="tm-text-primary">
                        Page <input ref={pageInput} type="text" onChange={(e) => setPage(p => ({ ...p, current: e.target.value }))} value={page.current} size="1" className="tm-input-paging tm-text-primary" /> of {page.max}
                    </form>


                    {page.current === page.max
                        ? <button className="btn btn-primary tm-btn-next disabled">Next Page</button>
                        : <button name='next' onClick={onChangePageClick} className="btn btn-primary tm-btn-next">Next Page</button>}


                </div>
            </div>
        </div>
    );
}