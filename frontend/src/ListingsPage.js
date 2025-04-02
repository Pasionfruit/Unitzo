import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './components/Card';
import ProviderCard from './components/ProviderCard';
import styles from './ListingsPage.module.css';

const LoadingSpinner = () => (
  <div className={styles.loadingSpinner}>
    <div className={styles.spinner}></div>
    <p>Loading listings...</p>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className={styles.errorMessage}>
    <p>Error: {message}</p>
    <button onClick={() => window.location.reload()} className={styles.retryButton}>
      Try Again
    </button>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

// Mock data for development
const mockListings = [
  {
    id: 1,
    heading: "Basic Internet Plan",
    description: "Perfect for light browsing and email",
    speed: "25 Mbps",
    price: "$29.99/month",
    image_url: "https://picsum.photos/400/200",
    offer_url: "#"
  },
  {
    id: 2,
    heading: "Premium Internet Plan",
    description: "Great for streaming and gaming",
    speed: "100 Mbps",
    price: "$49.99/month",
    image_url: "https://picsum.photos/400/201",
    offer_url: "#"
  },
  {
    id: 3,
    heading: "Ultra Fast Internet",
    description: "Best for large households and heavy usage",
    speed: "500 Mbps",
    price: "$79.99/month",
    image_url: "https://picsum.photos/400/202",
    offer_url: "#"
  }
];

const providers = [
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
    imageAlt: "Cox Connect2Compete (for families) Logo",
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
    imageAlt: "WOW! Internet Select 50 (for families) Logo",
    rating: 4,
    speed: "50 Mbps",
    description: "WOW! Internet Select 50: A plan offering 50 Mbps for families needing affordable options.",
    price: "$15",
    offerUrl: "https://wow.reachmobile.com/",
    isGold: false
  },
  {
    id: 4,
    title: "Xfinity Internet Essentials",
    imageUrl: "images/xfinity-internet-essentials-logo.png",
    imageAlt: "Xfinity Logo",
    rating: 5,
    speed: "50 Mbps",
    description: "Xfinity Internet Essentials: A widely available low-cost plan focusing on families and individuals needing affordable internet.",
    price: "$14.95",
    offerUrl: "https://www.xfinity.com/learn/internet-service/internet-essentials",
    isGold: false
  },
  {
    id: 5,
    title: "Optimum Advantage",
    imageUrl: "images/optimum-logo.jpg",
    imageAlt: "Optimum Logo",
    rating: 4,
    speed: "50 Mbps",
    description: "Optimum Advantage: Discounted high-speed plans for eligible low-income households.",
    price: "$15",
    offerUrl: "https://www.optimumadvantageinternet.com/",
    isGold: false
  },
  {
    id: 6,
    title: "Access from AT&T",
    imageUrl: "images/access-from-att-logo.jpg",
    imageAlt: "AT&T Logo",
    rating: 4,
    speed: "100 Mbps",
    description: "Access from AT&T: Affordable internet plans for low-income households, offering speeds sufficient for basic online tasks.",
    price: "$30",
    offerUrl: "https://www.att.com/internet/access/",
    isGold: false
  },
  {
    id: 7,
    title: "Starry Connect",
    imageUrl: "images/starry-logo.png",
    imageAlt: "Starry Connect Logo",
    rating: 3,
    speed: "30 Mbps",
    description: "Starry Connect: Affordable wireless internet for residential buildings in low-income areas.",
    price: "$15",
    offerUrl: "https://starry.com/starryconnect",
    isGold: false
  },
  {
    id: 8,
    title: "Verizon Forward with Fios",
    imageUrl: "images/verizon-fios-logo.jpg",
    imageAlt: "Verizon Forward with Fios Logo",
    rating: 4,
    speed: "300 Mbps",
    description: "Verizon Forward with Fios: Discounted fiber internet for families on federal assistance.",
    price: "$20",
    offerUrl: "https://www.verizon.com/discounts/verizon-forward/",
    isGold: false
  },
  {
    id: 9,
    title: "Spectrum Internet Assist",
    imageUrl: "images/spectrum-internet-assist-logo.jpg",
    imageAlt: "Spectrum Internet Assist Logo",
    rating: 3,
    speed: "50 Mbps",
    description: "Spectrum Internet Assist: Reduced-cost broadband for families or seniors qualifying for assistance.",
    price: "$25",
    offerUrl: "https://www.spectrum.com/internet/spectrum-internet-assist",
    isGold: false
  },
  {
    id: 10,
    title: "Mediacom Xtream Connect",
    imageUrl: "images/xtream-media-com-logo.png",
    imageAlt: "Mediacom Xtream Connect Logo",
    rating: 4,
    speed: "100 Mbps",
    description: "Mediacom Xtream Connect: Budget-friendly internet for low-income users with essential online activities.",
    price: "$14.99",
    offerUrl: "https://mediacomcable.com/xtream-connect/",
    isGold: false
  },
  {
    id: 11,
    title: "Verizon Forward with 5G/LTE Home",
    imageUrl: "images/verizon-connect-logo.png",
    imageAlt: "Verizon Forward with 5G/LTE Home Logo",
    rating: 3,
    speed: "50-100 Mbps",
    description: "Verizon Forward with 5G/LTE Home: Affordable home wireless for rural or underserved areas.",
    price: "$30",
    offerUrl: "https://www.verizon.com/discounts/verizon-forward/",
    isGold: false
  },
  {
    id: 12,
    title: "Cox ConnectAssist (for individuals)",
    imageUrl: "images/cox-connect2-logo.webp",
    imageAlt: "Cox ConnectAssist (for individuals) Logo",
    rating: 3,
    speed: "100 Mbps",
    description: "Cox ConnectAssist: Affordable internet for individuals on public assistance programs.",
    price: "$30",
    offerUrl: "https://www.cox.com/residential/internet/connect2compete.html",
    isGold: false
  }
];

const ListingsPage = () => {
  const [listings] = useState(mockListings);
  const [loading] = useState(false);
  const [error] = useState(null);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container" style={{ maxWidth: '100%', margin: '0px', padding: '0px', overflowX: 'hidden' }}>
      <div className="row">
        <div className="col-12">
          {providers.map(provider => (
            <ProviderCard key={provider.id} {...provider} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;
