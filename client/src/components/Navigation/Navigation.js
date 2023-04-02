import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

export const Navigation = () => {
    const navigate = useNavigate();
    let { isAuthenticated, logoutUser, username } = useContext(AuthContext);

    const onLogout = (e) => {
        e.preventDefault();
        logoutUser().then(navigate('/'))
    }

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>
                    <i className="fas fa-film mr-2"></i>
                    Catalog-Z
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">


                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        {isAuthenticated &&
                            <li className='welcome'>
                                <p>Hello {username}!</p>
                            </li>
                        }
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? 'nav-link nav-link-1 active' : 'nav-link nav-link-1'} to={'/photos'}>Photos</NavLink>
                        </li>

                        {isAuthenticated &&
                            <>
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => isActive ? 'nav-link nav-link-1 active' : 'nav-link nav-link-1'} to={'/upload'}>Upload Photo</NavLink>
                                </li>
                                <li className="nav-item">
                                    <Link onClick={onLogout} className='nav-link nav-link-1'>Logout</Link>
                                </li>
                            </>}
                        {!isAuthenticated && <>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? 'nav-link nav-link-1 active' : 'nav-link nav-link-1'} to={'/register'}>Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? 'nav-link nav-link-1 active' : 'nav-link nav-link-1'} to={'/login'}>Login</NavLink>
                            </li>
                        </>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    );
}