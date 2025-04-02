import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ListingsPage from './ListingsPage';
import './styles/global.css';

function App() {
  React.useEffect(() => {
    // Add Bootstrap CSS
    const bootstrapLink = document.createElement('link');
    bootstrapLink.rel = 'stylesheet';
    bootstrapLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css';
    document.head.appendChild(bootstrapLink);

    // Add Font Awesome CSS
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesomeLink);

    // Add Google Tag Manager
    const gtmScript = document.createElement('script');
    gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PKGHRPX4');`;
    document.head.appendChild(gtmScript);

    // Add GTM noscript iframe
    const gtmNoscript = document.createElement('noscript');
    gtmNoscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PKGHRPX4"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.insertBefore(gtmNoscript, document.body.firstChild);

    return () => {
      document.head.removeChild(bootstrapLink);
      document.head.removeChild(fontAwesomeLink);
      document.head.removeChild(gtmScript);
      document.body.removeChild(gtmNoscript);
    };
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ListingsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
