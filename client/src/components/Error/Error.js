import { useContext } from 'react';
import { ErrorContext } from '../../contexts/ErrorContext';
import styles from './error.module.css';

export const Error = () => {
    const error = useContext(ErrorContext);
    return (
        <div className={styles.container}>
            <p className={styles.error}>{error.code} </p>
            <p className={styles.error}>{error.message}</p>
        </div>
    );
}