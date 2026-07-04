/**
 * NamCompTech E-Commerce Seed Database
 * Copyright 2026 Google LLC
 * Licensed under the Apache-2.0 License
 */

export const INITIAL_CATEGORIES = [
  { id: 'laptops', name: 'Laptops', count: 6, icon: 'laptop', desc: 'Premium gaming rigs, ultrabooks, and productivity laptops.' },
  { id: 'desktops', name: 'Desktops & Workstations', count: 1, icon: 'desktop', desc: 'Custom built towers, studio workstations, and gaming PCs.' },
  { id: 'components', name: 'PC Components', count: 3, icon: 'cpu', desc: 'Next-gen GPUs, high-performance CPUs, fast RAM, and liquid coolers.' },
  { id: 'accessories', name: 'Computer Accessories', count: 3, icon: 'keyboard', desc: 'Mechanical keyboards, wireless gaming mice, audiophile headsets.' }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'lap-01',
    name: 'Acer Aspire Office Performance',
    category: 'laptops',
    condition: 'Refurbished',
    price: 3500.00,
    rating: 4.5,
    stock: 1,
    image: 'assets/acer_laptop_refurbished.png',
    featured: true,
    bestSeller: true,
    latest: false,
    brand: 'Acer',
    desc: 'Sleek and efficient Acer Aspire laptop featuring 4GB RAM and 400GB SSD storage. Fully certified refurbished, thoroughly tested, and pre-loaded with Windows 11 and Microsoft Office 2021 for a plug-and-play productivity experience.',
    specs: {
      'Processor': 'Intel Processor (Dual Core, highly efficient)',
      'Memory': '4GB DDR4 RAM',
      'Storage': '400GB SSD High Speed Storage',
      'Operating System': 'Windows 11 Home',
      'Office Software': 'Microsoft Office 2021 Full Version',
      'Warranty': '1 Year Store Warranty'
    },
    reviews: [
      { id: 1, user: 'Alex Mercer', rating: 5, date: '2026-06-12', title: 'Great budget office tool', text: 'Preinstalled Office was a lifesaver. Perfect for student assignments.', verified: true }
    ]
  },
  {
    id: 'lap-02',
    name: 'HP 250 G10 Business Notebook',
    category: 'laptops',
    condition: 'Refurbished',
    price: 3800.00,
    rating: 4.6,
    stock: 1,
    image: 'assets/hp_250_g10_refurbished.png',
    featured: true,
    bestSeller: false,
    latest: true,
    brand: 'HP',
    desc: 'HP 250 G10 business laptop powered by an Intel processor, 8GB RAM, and 256GB SSD. Optimized for secure professional use, pre-configured with Windows 11 and Microsoft Office 2021.',
    specs: {
      'Processor': 'Intel Processor (Up to 3.4 GHz)',
      'Memory': '8GB DDR4 RAM',
      'Storage': '256GB NVMe SSD Storage',
      'Operating System': 'Windows 11 Home',
      'Office Software': 'Microsoft Office 2021 Full Version',
      'Warranty': '1 Year Store Warranty'
    },
    reviews: [
      { id: 1, user: 'John Doe', rating: 5, date: '2026-06-20', title: 'Sturdy and reliable', text: 'Very neat unit. G10 design is slim and professional.', verified: true }
    ]
  },
  {
    id: 'lap-03',
    name: 'HP Classic Pro Student Edition',
    category: 'laptops',
    condition: 'Refurbished',
    price: 3500.00,
    rating: 4.4,
    stock: 1,
    image: 'assets/hp_standard_refurbished.png',
    featured: false,
    bestSeller: false,
    latest: false,
    brand: 'HP',
    desc: 'Very clean and fully functional classic HP laptop. Outfitted with 8GB RAM and a spacious 500GB hard drive. Comes complete with Windows 11 and Microsoft Office 2021.',
    specs: {
      'Processor': 'Intel Processor',
      'Memory': '8GB RAM',
      'Storage': '500GB HDD Storage',
      'Operating System': 'Windows 11 Home',
      'Office Software': 'Microsoft Office 2021 Full Version',
      'Warranty': '1 Year Store Warranty'
    },
    reviews: [
      { id: 1, user: 'Dev_Optimist', rating: 4, date: '2026-06-10', title: 'Runs smoothly', text: 'Classic chassis, but feels like new inside. Perfect for daily tasks.', verified: true }
    ]
  },
  {
    id: 'lap-04',
    name: 'HP 11th Gen PowerBook',
    category: 'laptops',
    condition: 'Refurbished',
    price: 3700.00,
    rating: 4.5,
    stock: 1,
    image: 'assets/hp_11th_gen_refurbished.png',
    featured: false,
    bestSeller: false,
    latest: true,
    brand: 'HP',
    desc: 'Modern HP Laptop powered by an 11th Generation processor. Includes 8GB RAM and 256GB storage. Pristine refurbished condition, preloaded with Windows 11.',
    specs: {
      'Processor': 'Intel Core 11th Gen Processor',
      'Memory': '8GB DDR4 RAM',
      'Storage': '256GB Storage',
      'Operating System': 'Windows 11 Home',
      'Warranty': '1 Year Store Warranty'
    },
    reviews: [
      { id: 1, user: 'Marcus Aurelius', rating: 5, date: '2026-04-20', title: 'Incredible value', text: 'Clean screen, quiet fan, very fast boot times.', verified: true }
    ]
  },
  {
    id: 'lap-05',
    name: 'HP ProBook 450 G9 (12th Gen)',
    category: 'laptops',
    condition: 'Refurbished',
    price: 6500.00,
    rating: 4.7,
    stock: 1,
    image: 'assets/hp_probook_12th_refurbished.png',
    featured: true,
    bestSeller: false,
    latest: false,
    brand: 'HP',
    desc: 'Enterprise-grade HP ProBook laptop featuring a 12th Generation Core i5 processor, 8GB RAM, and 512GB SSD storage. Fully refurbished and loaded with Windows 11 and Microsoft Office 2021.',
    specs: {
      'Processor': 'Intel Core i5 (12th Generation)',
      'Memory': '8GB DDR4 RAM',
      'Storage': '512GB NVMe SSD Storage',
      'Operating System': 'Windows 11 Pro',
      'Office Software': 'Microsoft Office 2021 Full Version',
      'Warranty': '1 Year Store Warranty'
    },
    reviews: [
      { id: 1, user: 'CyberKnight', rating: 5, date: '2026-06-15', title: 'Top-tier ProBook', text: 'No scratches, keyboard feels perfect, battery health is excellent.', verified: true }
    ]
  },
  {
    id: 'lap-06',
    name: 'HP ProBook 450 G10 (13th Gen)',
    category: 'laptops',
    condition: 'Refurbished',
    price: 7500.00,
    rating: 4.8,
    stock: 1,
    image: 'assets/hp_probook_13th_refurbished.png',
    featured: true,
    bestSeller: true,
    latest: false,
    brand: 'HP',
    desc: 'High-performance flagship HP ProBook laptop with a powerful 13th Generation Core i5 processor, 16GB RAM, and 512GB SSD. Thoroughly refurbished, preinstalled with Windows 11 and Microsoft Office 2021.',
    specs: {
      'Processor': 'Intel Core i5 (13th Generation)',
      'Memory': '16GB RAM',
      'Storage': '512GB NVMe SSD Storage',
      'Operating System': 'Windows 11 Pro',
      'Office Software': 'Microsoft Office 2021 Full Version',
      'Warranty': '1 Year Store Warranty'
    },
    reviews: [
      { id: 1, user: 'Linus T.', rating: 5, date: '2026-06-25', title: 'Fastest ProBook ever', text: '16GB RAM handles heavy multitask sessions with ease. The screen is extremely bright and crisp.', verified: true }
    ]
  },
  {
    id: 'acc-01',
    name: 'NamComp Aegis Solid Brass Mechanical Keyboard',
    category: 'accessories',
    condition: 'New',
    price: 3450.00,
    rating: 4.9,
    stock: 1,
    image: 'assets/mech_keyboard.png',
    featured: true,
    bestSeller: true,
    latest: false,
    brand: 'Aegis Studio',
    desc: 'For keyboard connoisseurs. The Aegis features a CNC-machined solid brass base-plate, a customized gasket mount design for a soft bottom-out typing feel, hand-lubricated tactile switches, and premium PBT double-shot keycaps. Equipped with warm, vintage amber backlighting that glows through a frosted glass bottom strip.',
    specs: {
      'Form Factor': '75% Layout (82 Keys, compact layout with dedicated arrow cluster)',
      'Case Material': 'CNC-Machined Aluminum Cover, Solid Sandblasted Brass Base Plate',
      'Switches': 'NamComp Custom Tactile Gold Switches (55g actuation, pre-lubed with Krytox 205g0)',
      'Mounting Style': 'Poron Gasket Mount with PC Plate',
      'Keycaps': 'Cherry Profile, Double-shot PBT (Grey, Black, Gold Accent)',
      'Connectivity': 'Detachable Braided USB Type-C, Custom Coiled Cable included',
      'Backlighting': 'Warm White/Amber SMD LEDs, dynamic effects, QMK/VIA compatible firmware'
    },
    reviews: [
      { id: 1, user: 'TaehaFan', rating: 5, date: '2026-06-20', title: 'Sounds like rain', text: 'The acoustic tuning on this is marvelous. Deep "thocky" sound. Extremely heavy, feels like a weapon.', verified: true },
      { id: 2, user: 'KeebLover', rating: 4, date: '2026-06-22', title: 'Stunning, but no wireless', text: 'Beautiful piece of metal. Wish it had Bluetooth, but the included coiled aviator cable is gorgeous anyway.', verified: true }
    ]
  },
  {
    id: 'acc-02',
    name: 'AeroLight 26K Wireless Gaming Mouse',
    category: 'accessories',
    condition: 'New',
    price: 2645.95,
    rating: 4.8,
    stock: 1,
    image: 'assets/aerolight_mouse.png',
    featured: false,
    bestSeller: true,
    latest: true,
    brand: 'AeroLight',
    desc: 'Designed for esports performance. Weighing only 63 grams, the AeroLight features an ultra-precise 26,000 DPI sensor, custom 90M click optical switches, and sub-millisecond wireless latency. The charging base is crafted from frosted liquid glass.',
    specs: {
      'Sensor': 'AeroPix 26K Optical Sensor (up to 26,000 DPI, 650 IPS)',
      'Weight': '63 grams (Without cable)',
      'Polling Rate': 'Native 4000Hz Wireless polling rate (requires included high-speed dongle)',
      'Battery Life': 'Up to 150 hours of continuous gaming in 1000Hz mode',
      'Switches': 'Optical Mouse Switches Gen-3 (90 Million click life, instant actuation)',
      'Charging': 'Wireless Magnetic charging dock + USB-C fast charging'
    },
    reviews: [
      { id: 1, user: 'AimGod', rating: 5, date: '2026-06-24', title: 'Unbelievably light', text: 'Feels like air. Mouse clicks are extremely crisp, zero pre-travel. Tracking is pixel perfect.', verified: true }
    ]
  },
  {
    id: 'acc-03',
    name: 'StudioPro ANC Wireless Studio Headphones',
    category: 'accessories',
    condition: 'Open Box',
    price: 2999.99,
    rating: 4.5,
    stock: 1,
    image: 'assets/studiopro_headphones.png',
    featured: false,
    bestSeller: false,
    latest: false,
    brand: 'Acoustics Lab',
    desc: 'Audiophile grade studio headphones featuring adaptive active noise cancelling and a composite beryllium driver. This open-box unit is certified fully sanitary and functional, offering a top-tier listening experience at an excellent discount.',
    specs: {
      'Drivers': '40mm Custom Beryllium-Coated Dynamic Drivers',
      'Frequency Response': '5Hz - 40,000Hz (Hi-Res Audio Certified)',
      'Noise Cancelling': 'Hybrid Adaptive ANC (up to 42dB ambient suppression)',
      'Connectivity': 'Bluetooth 5.3 (supports LDAC, AAC, aptX Adaptive) and 3.5mm wired',
      'Battery Life': 'Up to 45 hours with ANC ON, 60 hours with ANC OFF'
    },
    reviews: [
      { id: 1, user: 'SoundEngineer', rating: 5, date: '2026-05-05', title: 'Superb flat response', text: 'Unlike consumer headphones, the bass is not artificially boosted. Excellent flat signature for mixing on the go. Noise cancelling is fantastic on flights.', verified: true }
    ]
  },
  {
    id: 'comp-01',
    name: 'NVIDIA GeForce RTX 4080 Super GPU',
    category: 'components',
    condition: 'New',
    price: 35999.99,
    rating: 4.8,
    stock: 1,
    image: 'assets/desktop_pc.png',
    featured: true,
    bestSeller: false,
    latest: true,
    brand: 'NVIDIA',
    desc: 'Supercharge your workstation or gaming PC with the RTX 4080 Super. Built on the ultra-efficient Ada Lovelace architecture, it brings ray-traced graphics and AI-driven DLSS 3 frame generation to life, making 4K gaming smooth and providing massive CUDA acceleration for creative applications.',
    specs: {
      'Architecture': 'Ada Lovelace (TSMC 4N)',
      'CUDA Cores': '10,240 Cores',
      'Memory': '16GB GDDR6X',
      'Memory Bus': '256-bit',
      'Core Boost Clock': '2.55 GHz',
      'Recommended PSU': '750W minimum, PCIe 5.0 12VHPWR connector'
    },
    reviews: [
      { id: 1, user: 'GamerX', rating: 5, date: '2026-06-03', title: 'Amazing graphics card', text: 'Upgraded from an RTX 2080. The performance jump is mindblowing. Quiet fans, great design.', verified: true }
    ]
  },
  {
    id: 'comp-02',
    name: 'AMD Ryzen 7 7800X3D CPU',
    category: 'components',
    condition: 'New',
    price: 33599.99,
    rating: 4.9,
    stock: 1,
    image: 'assets/desktop_pc.png',
    featured: false,
    bestSeller: true,
    latest: false,
    brand: 'AMD',
    desc: 'The undisputed gaming champion. By stacking a high-speed L3 cache directly on top of the processor die, AMD 3D V-Cache technology dramatically boosts gaming frame rates. Built for the AM5 platform with DDR5 support.',
    specs: {
      'Socket': 'AM5 (compatible with 600-series chipsets)',
      'Cores / Threads': '8 Cores / 16 Threads',
      'Base / Boost Clock': '4.2 GHz / 5.0 GHz',
      'Cache': '104MB Total (96MB L3 Cache)',
      'TDP': '120W',
      'Memory Support': 'DDR5 (Dual Channel)'
    },
    reviews: [
      { id: 1, user: 'PCBuilderPro', rating: 5, date: '2026-06-21', title: 'Simply the best gaming chip', text: 'Paired this with a 4090. Games run incredibly smooth, especially 1% low frame rates in simulation games.', verified: true }
    ]
  },
  {
    id: 'comp-03',
    name: 'Corsair Dominator Titanium 32GB DDR5',
    category: 'components',
    condition: 'Refurbished',
    price: 6200.00,
    rating: 4.7,
    stock: 1,
    image: 'assets/corsair_ram.png',
    featured: false,
    bestSeller: false,
    latest: false,
    brand: 'Corsair',
    desc: 'Certified refurbished premium memory kit. Top-tier overclocking headroom combined with elegant customizable RGB lighting bars. Precision screened for stable performance at high frequencies.',
    specs: {
      'Capacity': '32GB (2 x 16GB Modules)',
      'Speed': '6000MHz (PC5-48000)',
      'Latency': 'CL30 (30-36-36-76)',
      'Voltage': '1.40V',
      'Profile Support': 'AMD EXPO / Intel XMP 3.0',
      'Height': 'Dynamic customizable top bar, aluminum heatspreader'
    },
    reviews: [
      { id: 1, user: 'Overclocker', rating: 4, date: '2026-05-15', title: 'Excellent timings', text: 'Works flawlessly on my X670 motherboard at the EXPO profile. RGB looks classy and not tacky.', verified: true }
    ]
  },
  {
    id: 'desk-01',
    name: 'Chronos Custom Gaming Tower',
    category: 'desktops',
    condition: 'New',
    price: 49999.00,
    rating: 5.0,
    stock: 1,
    image: 'assets/desktop_pc.png',
    featured: true,
    bestSeller: true,
    latest: true,
    brand: 'Chronos',
    desc: 'Full hardline custom liquid loop desktop. Equipped with a Ryzen 9 7950X3D processor and liquid-cooled NVIDIA GeForce RTX 4090. A absolute work of art housed in carbon fiber and tempered glass.',
    specs: {
      'Processor': 'AMD Ryzen 9 7950X3D (16 Cores, 3D V-Cache)',
      'Graphics Card': 'Liquid-Cooled NVIDIA GeForce RTX 4090 24GB GDDR6X',
      'Memory': '64GB DDR5 G.Skill Trident Z5 6000MHz',
      'Storage': '4TB WD Black SN850X PCIe Gen4 NVMe SSD',
      'Motherboard': 'ASUS ROG Crosshair X670E Hero',
      'Cooling': 'Custom Hardline Acrylic Tubing, EKWB Blocks & Dual 360mm Radiators',
      'Power Supply': '1200W Seasonic Prime Titanium (ATX 3.0)',
      'Operating System': 'Windows 11 Pro Pre-configured',
      'Warranty': '2 Year Systems Warranty'
    },
    reviews: [
      { id: 1, user: 'Hassan K.', rating: 5, date: '2026-06-28', title: 'Absolute Masterpiece', text: 'Quiet under heavy rendering loads. The hardline loop bent work is pristine. Simply the fastest PC money can buy.', verified: true }
    ]
  }
];

export const INITIAL_COUPONS = [
  { code: 'TECH15', discountType: 'percentage', discountValue: 15, desc: '15% Off Site-wide' },
  { code: 'GOLDEN20', discountType: 'percentage', discountValue: 20, minCart: 1500, desc: '20% Off for orders over $1,500' },
  { code: 'FREESHIP', discountType: 'fixed', discountValue: 25, isFreeShipping: true, desc: 'Free Express Shipping ($25 Value)' }
];

export const INITIAL_ADS_CONFIG = {
  enabled: true,
  impressions: 2489,
  clicks: 142,
  revenue: 89.45,
  showPersonalized: true, // Controlled by GDPR consent
  adZones: [
    { id: 'ad-home-hero', page: 'index', position: 'Below Hero Banner', format: 'Horizontal Leaderboard (728x90)', active: true },
    { id: 'ad-shop-sidebar', page: 'shop', position: 'Sidebar Filters Bottom', format: 'Square Banner (250x250)', active: true },
    { id: 'ad-product-footer', page: 'product', position: 'Above Related Products', format: 'Horizontal Banner (728x90)', active: true },
    { id: 'ad-cart-sidebar', page: 'cart', position: 'Below Order Summary', format: 'Vertical Sky (160x600)', active: true },
    { id: 'ad-contact-aside', page: 'contact', position: 'Aside Office Info', format: 'Square Banner (250x250)', active: true },
    { id: 'ad-admin-dashboard', page: 'admin', position: 'Metrics Bottom Footer', format: 'Horizontal Banner (728x90)', active: true }
  ],
  inventory: [
    { title: 'Upgrade to Ryzen 7800X3D - Ultimate Gaming Performance', text: 'AMD V-Cache technology delivers unbeatable FPS. Shop now at NamCompTech!', cta: 'Upgrade Today', imgUrl: 'assets/desktop_pc.png', advertiser: 'AMD Partner Networks' },
    { title: 'Work In Silence with StudioPro ANC Headphones', text: 'Experience hi-res wireless sound with industry leading noise suppression.', cta: 'Order Now', imgUrl: 'assets/studiopro_headphones.png', advertiser: 'Acoustic Labs Corp' },
    { title: 'RTX 4080 Super - Ada Lovelace Unleashed', text: 'Get high-wattage ray tracing and DLSS 3.0. Stock is limited, buy yours today.', cta: 'View Deals', imgUrl: 'assets/desktop_pc.png', advertiser: 'NVIDIA Direct Partner' },
    { title: 'NamComp Aegis - Custom Typists Masterpiece', text: 'Typing should be an experience. Solid brass base plate, lubed switches.', cta: 'Customize Keyboard', imgUrl: 'assets/mech_keyboard.png', advertiser: 'Aegis Keyboard Co' }
  ]
};

export const INITIAL_ORDERS = [
  {
    id: 'NCT-10824',
    date: '2026-06-25T14:32:00Z',
    customer: { name: 'John Doe', email: 'john.doe@example.com', phone: '+264 81 123 4567', address: 'Otjiwarongo, Namibia' },
    items: [
      { id: 'lap-02', name: 'ThinkPad X1 Carbon Gen 12 Ultra', price: 1899.00, qty: 1 }
    ],
    subtotal: 1899.00,
    discount: 0.00,
    shipping: 25.00,
    tax: 0.00,
    total: 1924.00,
    paymentMethod: 'Credit Card (ending *4242)',
    status: 'Shipped'
  },
  {
    id: 'NCT-10825',
    date: '2026-06-26T09:15:00Z',
    customer: { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+264 81 987 6543', address: 'Rundu, Namibia' },
    items: [
      { id: 'acc-01', name: 'NamComp Aegis Solid Brass Mechanical Keyboard', price: 249.00, qty: 2 },
      { id: 'acc-02', name: 'AeroLight 26K Wireless Gaming Mouse', price: 129.00, qty: 1 }
    ],
    subtotal: 627.00,
    discount: 94.05, // TECH15 coupon
    shipping: 0.00, // Free shipping
    tax: 0.00,
    total: 532.95,
    paymentMethod: 'PayPal',
    status: 'Pending'
  }
];

export const FAQ_DATA = [
  { q: 'Do you offer international shipping?', a: 'Yes, NamCompTech ships globally. Express shipping is free for orders above $1,500, or a flat rate of $25 is applied.' },
  { q: 'What is the return policy for used/refurbished products?', a: 'All Open Box and Certified Refurbished products come with a 30-day money-back guarantee and a comprehensive 1-year store warranty (longer for specific items).' },
  { q: 'Can I request a custom desktop build?', a: 'Absolutely. Contact our team through the Live Chat or Contact Form, and our master builders will design a tower based on your budget and specification requirements.' },
  { q: 'How does the product comparison work?', a: 'Add up to 3 products across the shop using the "Compare" button. A floating drawer will appear allowing you to view detailed specs side-by-side.' }
];
