import React, { useState, useEffect } from 'react';
import styles from './AdminPage.module.css';

// Mock data for development
const mockListings = [
  {
    id: 1,
    title: "Astound Internet First",
    imageUrl: "images/astound-logo.png",
    imageAlt: "Astound Logo",
    rating: 5,
    speed: "50 Mbps",
    description: "Astound Internet First: Aimed at low-income families, offering reliable speeds for school and work at a reduced rate.",
    price: "$10",
    offerUrl: "https://www.astound.com/internetfirst/",
    isGold: true
  },
  {
    id: 2,
    title: "Cox Connect2Compete (for families)",
    imageUrl: "images/cox-connect2-logo.webp",
    imageAlt: "Cox Connect2Compete Logo",
    rating: 4,
    speed: "100 Mbps",
    description: "Cox Connect2Compete: Family-focused, low-cost internet for students in low-income households.",
    price: "$10",
    offerUrl: "https://www.cox.com/residential/internet/connect2compete.html",
    isGold: false
  },
  {
    id: 3,
    title: "WOW! Internet Select 50 (for families)",
    imageUrl: "images/wow-logo.jpg",
    imageAlt: "WOW! Internet Logo",
    rating: 4,
    speed: "50 Mbps",
    description: "WOW! Internet Select 50: A plan offering 50 Mbps for families needing affordable options.",
    price: "$15",
    offerUrl: "https://wow.reachmobile.com/",
    isGold: false
  }
];

const STORAGE_KEY = 'internetListings';

const AdminPage = () => {
  const [listings, setListings] = useState(() => {
    // Initialize from localStorage if available, otherwise use mock data
    const savedListings = localStorage.getItem(STORAGE_KEY);
    return savedListings ? JSON.parse(savedListings) : mockListings;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingListing, setEditingListing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    imageAlt: '',
    rating: 5,
    speed: '',
    description: '',
    price: '',
    offerUrl: '',
    isGold: false
  });

  // Save listings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  }, [listings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (editingListing) {
        // Update existing listing
        const updatedListings = listings.map(listing => 
          listing.id === editingListing.id ? { ...formData, id: listing.id } : listing
        );
        setListings(updatedListings);
      } else {
        // Add new listing
        const newListing = {
          ...formData,
          id: Math.max(...listings.map(l => l.id), 0) + 1
        };
        setListings([...listings, newListing]);
      }
      resetForm();
      setEditingListing(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      setListings(listings.filter(listing => listing.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (listing) => {
    setEditingListing(listing);
    setFormData({
      title: listing.title,
      imageUrl: listing.imageUrl,
      imageAlt: listing.imageAlt,
      rating: listing.rating,
      speed: listing.speed,
      description: listing.description,
      price: listing.price,
      offerUrl: listing.offerUrl,
      isGold: listing.isGold || false
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      imageUrl: '',
      imageAlt: '',
      rating: 5,
      speed: '',
      description: '',
      price: '',
      offerUrl: '',
      isGold: false
    });
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.adminPage}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formSection}>
        <h2>{editingListing ? 'Edit Listing' : 'Add New Listing'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="imageAlt">Image Alt Text</label>
            <input
              type="text"
              id="imageAlt"
              value={formData.imageAlt}
              onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="rating">Rating (1-5)</label>
            <input
              type="number"
              id="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="speed">Speed</label>
            <input
              type="text"
              id="speed"
              value={formData.speed}
              onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="offerUrl">Offer URL</label>
            <input
              type="url"
              id="offerUrl"
              value={formData.offerUrl}
              onChange={(e) => setFormData({ ...formData, offerUrl: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                checked={formData.isGold}
                onChange={(e) => setFormData({ ...formData, isGold: e.target.checked })}
              />
              Gold Listing
            </label>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {editingListing ? 'Update Listing' : 'Add Listing'}
            </button>
            {editingListing && (
              <button
                type="button"
                onClick={() => {
                  setEditingListing(null);
                  resetForm();
                }}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className={styles.listingsSection}>
        <h2>Current Listings</h2>
        <div className={styles.listingsGrid}>
          {listings.map((listing) => (
            <div key={listing.id} className={styles.listingCard}>
              <img src={listing.imageUrl} alt={listing.imageAlt} className={styles.listingImage} />
              <div className={styles.listingInfo}>
                <h3>{listing.title}</h3>
                <p>Speed: {listing.speed}</p>
                <p>Price: {listing.price}</p>
                <p>Rating: {listing.rating}/5</p>
              </div>
              <div className={styles.listingActions}>
                <button
                  onClick={() => handleEdit(listing)}
                  className={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(listing.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 