import React, { useState, useEffect } from 'react';
import { getAllProviders, addProvider, updateProvider, deleteProvider } from '../utils/db';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProvider, setEditingProvider] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    image_alt: '',
    rating: 0,
    speed: '',
    description: '',
    price: '',
    offer_url: '',
    is_gold: false
  });

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const data = await getAllProviders();
      setProviders(data);
    } catch (err) {
      setError('Failed to load providers');
      console.error('Error fetching providers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProvider) {
        await updateProvider(editingProvider.id, formData);
      } else {
        await addProvider(formData);
      }
      setFormData({
        title: '',
        image_url: '',
        image_alt: '',
        rating: 0,
        speed: '',
        description: '',
        price: '',
        offer_url: '',
        is_gold: false
      });
      setEditingProvider(null);
      fetchProviders();
    } catch (err) {
      setError('Failed to save provider');
      console.error('Error saving provider:', err);
    }
  };

  const handleEdit = (provider) => {
    setEditingProvider(provider);
    setFormData(provider);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this provider?')) {
      try {
        await deleteProvider(id);
        fetchProviders();
      } catch (err) {
        setError('Failed to delete provider');
        console.error('Error deleting provider:', err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.adminContainer}>
      <h1>Provider Management</h1>
      
      <form onSubmit={handleSubmit} className={styles.providerForm}>
        <h2>{editingProvider ? 'Edit Provider' : 'Add New Provider'}</h2>
        
        <div className={styles.formGroup}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Image Alt Text:</label>
          <input
            type="text"
            name="image_alt"
            value={formData.image_alt}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Rating (1-5):</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Speed:</label>
          <input
            type="text"
            name="speed"
            value={formData.speed}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Offer URL:</label>
          <input
            type="text"
            name="offer_url"
            value={formData.offer_url}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>
            <input
              type="checkbox"
              name="is_gold"
              checked={formData.is_gold}
              onChange={handleInputChange}
            />
            Gold Provider
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>
          {editingProvider ? 'Update Provider' : 'Add Provider'}
        </button>
      </form>

      <div className={styles.providersList}>
        <h2>Current Providers</h2>
        <table className={styles.providersTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Rating</th>
              <th>Speed</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map(provider => (
              <tr key={provider.id}>
                <td>{provider.title}</td>
                <td>{provider.rating}</td>
                <td>{provider.speed}</td>
                <td>{provider.price}</td>
                <td>
                  <button
                    onClick={() => handleEdit(provider)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(provider.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage; 