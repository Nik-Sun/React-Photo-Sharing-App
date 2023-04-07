import { useLocation, useSearchParams } from "react-router-dom";



import { useAuthForm } from "../../hooks/useAuthForm";
export const Search = () => {
    const location = useLocation();
    const [search, setSearch] = useSearchParams({ 'search': '' });

    const { formValues, onFormChange, resetForm } = useAuthForm({ 'search': '' });

    const onSearchSubmit = async (e) => {
        e.preventDefault();
        resetForm();
        const search = { 'search': formValues.search }
        setSearch(search);
    };

    return (
        <div className="tm-hero d-flex justify-content-center align-items-center" data-parallax="scroll" data-image-src="img/hero.jpg">

            {location.pathname === '/photos' &&
                <form onSubmit={onSearchSubmit} className="d-flex tm-search-form">
                    <input value={formValues.search} onChange={onFormChange} className="form-control tm-search-input" placeholder="Search" name='search' />
                    <button className="btn btn-outline-success tm-search-btn" type="submit">
                        <i className="fas fa-search"></i>
                    </button>
                </form>}
        </div>
    );
}