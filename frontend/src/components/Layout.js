import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.nav}>
            <Link to="/" className={styles.logo}>
              Internet Listings
            </Link>
            <div className={styles.navLinks}>
              <Link to="/" className={styles.navLink}>
                Home
              </Link>
              <Link to="/about" className={styles.navLink}>
                About
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          {children}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Internet Listings. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 