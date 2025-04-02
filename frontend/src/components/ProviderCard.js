import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProviderCard.module.css';

const ProviderCard = ({ 
  title, 
  imageUrl, 
  imageAlt, 
  rating, 
  speed, 
  description, 
  price, 
  offerUrl, 
  isGold 
}) => {
  return (
    <div className={`${styles.card} ${isGold ? styles.goldCard : ''}`}>
      <div className={`${styles.providerHeader} ${isGold ? styles.goldHeader : styles.darkHeader}`}>
        <h2 className={styles.providerTitle}>{title}</h2>
      </div>
      <div className={styles.cardBody}>
        <div className="row align-items-center">
          <div className="col-md-3 text-center">
            <img src={imageUrl} alt={imageAlt} className="img-fluid mb-3" />
            <div className={styles.starRating}>
              {[...Array(5)].map((_, index) => (
                <i 
                  key={index} 
                  className={`fas fa-star ${index < rating ? styles.filled : ''}`}
                />
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <p className={styles.speedText}>Speeds up to</p>
            <p className={styles.maxSpeed}>{speed}</p>
          </div>
          <div className="col-md-3">
            <div className={styles.descriptionItem}>
              <i className="fas fa-check"></i>
              {description}
            </div>
          </div>
          <div className="col-md-3 text-center">
            <p className="mb-1 small">Pricing starting from</p>
            <p className={styles.price}>{price}</p>
            <a 
              href={offerUrl} 
              className="btn btn-primary btn-lg" 
              target="_blank" 
              rel="noopener noreferrer nofollow"
            >
              View Plans
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

ProviderCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  speed: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  offerUrl: PropTypes.string.isRequired,
  isGold: PropTypes.bool
};

export default ProviderCard; 