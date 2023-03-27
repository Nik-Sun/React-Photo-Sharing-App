import { NavLink } from 'react-router-dom'
export const Navigation = () => {

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <i className="fas fa-film mr-2"></i>
                    Catalog-Z
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink  className={({isActive}) => isActive ? 'nav-link nav-link-1 active': 'nav-link nav-link-1'} to={'/'}>Photos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({isActive}) => isActive ? 'nav-link nav-link-1 active': 'nav-link nav-link-1'} to={'/upload'}>Upload Photo</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink  className={({isActive}) => isActive ? 'nav-link nav-link-1 active': 'nav-link nav-link-1'} to={'/register'}>Register</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink  className={({isActive}) => isActive ? 'nav-link nav-link-1 active': 'nav-link nav-link-1'} to={'/login'}>Photos</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}