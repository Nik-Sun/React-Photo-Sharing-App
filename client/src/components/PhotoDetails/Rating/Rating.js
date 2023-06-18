import { useEffect, useState } from 'react';

import { getVote, addVote } from '../../../services/ratingService'
import styles from './rating.module.css';

export const Rating = ({ photoId, updateRating }) => {
    const [tooltip, setTooltip] = useState({
        tooltipUpVisible: false,
        tooltipDownVisible: false
    });
    const [vote, setVote] = useState({ rating: 0 });
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        getVote(photoId).then(data => setVote(data))
    }, []);

    const onVoteClick = (e) => {
        setSpinner(true)
        addVote({
            imageId: photoId,
            rating: e.target.value
        }).then(data => {
            setVote(data);
            updateRating(data.rating)
            setSpinner(false);
        });
    };

    const onRemoveVoteClick = () => {
        setSpinner(true)
        addVote({
            imageId: photoId,
            rating: 0
        }).then(data => {
            setVote(data);
            setSpinner(false);
        });
    };


    if (vote.rating === 1) {
        return (
            spinner
                ? <div className={styles.dualRingSpinner}></div>
                : <div className={styles.ratingBtnContainer}>
                    <button
                        className={`${styles.ratingBtn} ${tooltip.tooltipUpVisible ? styles.ratingBtnVotedActive : styles.ratingBtnUpVoted}`}
                        onMouseLeave={() => setTooltip(t => ({ ...t, tooltipUpVisible: false }))}
                        onMouseEnter={() => setTooltip(t => ({ ...t, tooltipUpVisible: true }))}
                        onClick={onRemoveVoteClick}
                    />

                    <button
                        className={`${styles.ratingBtn} ${tooltip.tooltipDownVisible ? styles.ratingBtnDownActive : styles.ratingBtnDown}`}
                        onMouseLeave={() => setTooltip(t => ({ ...t, tooltipDownVisible: false }))}
                        onMouseEnter={() => setTooltip(t => ({ ...t, tooltipDownVisible: true }))}
                        onClick={onVoteClick}
                        value={-1}
                    />
                </div>
        );
    } else if (vote.rating === -1) {
        return (
            spinner
                ? <div className={styles.dualRingSpinner}></div>
                : <div className={styles.ratingBtnContainer}>
                    <button
                        className={`${styles.ratingBtn} ${tooltip.tooltipUpVisible ? styles.ratingBtnUpActive : styles.ratingBtnUp}`}
                        onMouseLeave={() => setTooltip(t => ({ ...t, tooltipUpVisible: false }))}
                        onMouseEnter={() => setTooltip(t => ({ ...t, tooltipUpVisible: true }))}
                        onClick={onVoteClick}
                        value={1}
                    />

                    <button
                        className={`${styles.ratingBtn} ${tooltip.tooltipDownVisible ? styles.ratingBtnVotedActive : styles.ratingBtnDownVoted}`}
                        onMouseLeave={() => setTooltip(t => ({ ...t, tooltipDownVisible: false }))}
                        onMouseEnter={() => setTooltip(t => ({ ...t, tooltipDownVisible: true }))}
                        onClick={onRemoveVoteClick}
                    />
                </div>
        );

    } else {
        return (

            spinner
                ? <div className={styles.dualRingSpinner}></div>
                : <div className={styles.ratingBtnContainer}>
                    <button
                        className={`${styles.ratingBtn} ${tooltip.tooltipUpVisible ? styles.ratingBtnUpActive : styles.ratingBtnUp}`}
                        onMouseLeave={() => setTooltip(t => ({ ...t, tooltipUpVisible: false }))}
                        onMouseEnter={() => setTooltip(t => ({ ...t, tooltipUpVisible: true }))}
                        onClick={onVoteClick}
                        value={1}
                    />

                    <button
                        className={`${styles.ratingBtn} ${tooltip.tooltipDownVisible ? styles.ratingBtnDownActive : styles.ratingBtnDown}`}
                        onMouseLeave={() => setTooltip(t => ({ ...t, tooltipDownVisible: false }))}
                        onMouseEnter={() => setTooltip(t => ({ ...t, tooltipDownVisible: true }))}
                        onClick={onVoteClick}
                        value={-1}
                    />
                </div>
        );
    }

}