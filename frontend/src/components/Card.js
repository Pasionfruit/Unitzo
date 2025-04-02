import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({ heading, description, speed, price, image_url, offer_url }) => (
  <div className={styles.card}>
    <div className={styles.imageContainer}>
      <img src={image_url} alt={heading} className={styles.image} />
    </div>
    <div className={styles.content}>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.details}>
        <p className={styles.speed}>Speeds up to {speed}</p>
        <p className={styles.price}>Starting from {price}</p>
      </div>
      <a
        href={offer_url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
      >
        View Plans
      </a>
    </div>
  </div>
);

Card.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  speed: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  offer_url: PropTypes.string.isRequired,
};

export default Card;