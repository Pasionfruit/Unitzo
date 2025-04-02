-- Create providers table
CREATE TABLE providers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    image_alt TEXT NOT NULL,
    rating INTEGER NOT NULL,
    speed TEXT NOT NULL,
    description TEXT NOT NULL,
    price TEXT NOT NULL,
    offer_url TEXT NOT NULL,
    is_gold BOOLEAN NOT NULL DEFAULT 0
);

-- Insert provider data
INSERT INTO providers (title, image_url, image_alt, rating, speed, description, price, offer_url, is_gold) VALUES
    ('Astound Internet First', 'images/astound-logo.png', 'Astound Logo', 5, '50 Mbps', 'Astound Internet First: Aimed at low-income families, offering reliable speeds for school and work at a reduced rate.', '$10', 'https://www.astound.com/internetfirst/', 1),
    ('Cox Connect2Compete (for families)', 'images/cox-connect2-logo.webp', 'Cox Connect2Compete (for families) Logo', 4, '100 Mbps', 'Cox Connect2Compete: Family-focused, low-cost internet for students in low-income households.', '$10', 'https://www.cox.com/residential/internet/connect2compete.html', 0),
    ('WOW! Internet Select 50 (for families)', 'images/wow-logo.jpg', 'WOW! Internet Select 50 (for families) Logo', 4, '50 Mbps', 'WOW! Internet Select 50: A plan offering 50 Mbps for families needing affordable options.', '$15', 'https://wow.reachmobile.com/', 0),
    ('Xfinity Internet Essentials', 'images/xfinity-internet-essentials-logo.png', 'Xfinity Logo', 5, '50 Mbps', 'Xfinity Internet Essentials: A widely available low-cost plan focusing on families and individuals needing affordable internet.', '$14.95', 'https://www.xfinity.com/learn/internet-service/internet-essentials', 0),
    ('Optimum Advantage', 'images/optimum-logo.jpg', 'Optimum Logo', 4, '50 Mbps', 'Optimum Advantage: Discounted high-speed plans for eligible low-income households.', '$15', 'https://www.optimumadvantageinternet.com/', 0),
    ('Access from AT&T', 'images/access-from-att-logo.jpg', 'AT&T Logo', 4, '100 Mbps', 'Access from AT&T: Affordable internet plans for low-income households, offering speeds sufficient for basic online tasks.', '$30', 'https://www.att.com/internet/access/', 0),
    ('Starry Connect', 'images/starry-logo.png', 'Starry Connect Logo', 3, '30 Mbps', 'Starry Connect: Affordable wireless internet for residential buildings in low-income areas.', '$15', 'https://starry.com/starryconnect', 0),
    ('Verizon Forward with Fios', 'images/verizon-fios-logo.jpg', 'Verizon Forward with Fios Logo', 4, '300 Mbps', 'Verizon Forward with Fios: Discounted fiber internet for families on federal assistance.', '$20', 'https://www.verizon.com/discounts/verizon-forward/', 0),
    ('Spectrum Internet Assist', 'images/spectrum-internet-assist-logo.jpg', 'Spectrum Internet Assist Logo', 3, '50 Mbps', 'Spectrum Internet Assist: Reduced-cost broadband for families or seniors qualifying for assistance.', '$25', 'https://www.spectrum.com/internet/spectrum-internet-assist', 0),
    ('Mediacom Xtream Connect', 'images/xtream-media-com-logo.png', 'Mediacom Xtream Connect Logo', 4, '100 Mbps', 'Mediacom Xtream Connect: Budget-friendly internet for low-income users with essential online activities.', '$14.99', 'https://mediacomcable.com/xtream-connect/', 0),
    ('Verizon Forward with 5G/LTE Home', 'images/verizon-connect-logo.png', 'Verizon Forward with 5G/LTE Home Logo', 3, '50-100 Mbps', 'Verizon Forward with 5G/LTE Home: Affordable home wireless for rural or underserved areas.', '$30', 'https://www.verizon.com/discounts/verizon-forward/', 0),
    ('Cox ConnectAssist (for individuals)', 'images/cox-connect2-logo.webp', 'Cox ConnectAssist (for individuals) Logo', 3, '100 Mbps', 'Cox ConnectAssist: Affordable internet for individuals on public assistance programs.', '$30', 'https://www.cox.com/residential/internet/connect2compete.html', 0); 