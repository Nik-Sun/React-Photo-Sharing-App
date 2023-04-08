
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import styles from '../../public/css/home.module.css';
import video from '../../public/video/hero.mp4'

export const Home = () => {
    const { isAuthenticated } = useContext(AuthContext);


    return (
        <>
            <div className={styles.container}>

                <div className={styles.video}>
                    <video className={styles.videoItem} src={video} loop={true} autoPlay={true} />
                </div>
                <div className={styles.text}>
                    <h1 className={styles.title}>Welcome to Photo Sharing App</h1>
                    {isAuthenticated
                        ? <>
                            <h2>You can try to <Link to={'/upload'} className={styles.link}>Upload a picture!</Link></h2>
                            <h2>Or <Link to={'/photos'} className={styles.link}>Browse</Link> existing pictures!</h2>
                        </>
                        : <>
                            <h2>Dont have account yet?<Link to={'/register'} className={styles.link}> Register Here!</Link></h2>
                            <h2>Already have an account?<Link to={'/login'} className={styles.link}> Login Here!</Link></h2>
                        </>
                    }

                </div>
            </div>
        </>
    );
};