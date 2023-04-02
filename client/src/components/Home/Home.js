
import { Link } from 'react-router-dom';
import styles from '../../public/css/home.module.css';
import video from '../../public/video/hero.mp4'

export const Home = () => {


    return (
        <>
            <div className={styles.container}>

                <div className={styles.video}>
                    <video className={styles.videoItem} src={video} loop={true} autoPlay={true} />
                </div>
                <div className={styles.text}>
                    <h1 className={styles.title}>Welcome to Photo Sharing App</h1>
                    <h2>Dont have account yet? Register <Link className={styles.link}>Here</Link></h2>
                    <h2>Already have an account? Login <Link className={styles.link}>Here</Link></h2>
                </div>
            </div>
        </>
    );
};