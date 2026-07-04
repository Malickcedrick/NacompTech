/**
 * NamCompTech E-Commerce Shared Logic
 * Copyright 2026 Google LLC
 * Licensed under the Apache-2.0 License
 */

import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_COUPONS,
  INITIAL_ADS_CONFIG,
  INITIAL_ORDERS,
  FAQ_DATA
} from './data.js';

// ==========================================================================
// 1. LocalStorage Database Initializer & Syncer
// ==========================================================================
export class StoreDb {
  static init() {
    const currentVersion = localStorage.getItem('nct_db_version');
    const targetVersion = 'v5.4';

    if (currentVersion !== targetVersion) {
      localStorage.setItem('nct_catalog', JSON.stringify(INITIAL_PRODUCTS));
      localStorage.setItem('nct_categories', JSON.stringify(INITIAL_CATEGORIES));
      localStorage.setItem('nct_coupons', JSON.stringify(INITIAL_COUPONS));
      localStorage.setItem('nct_orders', JSON.stringify(INITIAL_ORDERS));
      localStorage.setItem('nct_ads_config', JSON.stringify(INITIAL_ADS_CONFIG));
      localStorage.setItem('nct_db_version', targetVersion);
    } else {
      if (!localStorage.getItem('nct_catalog')) {
        localStorage.setItem('nct_catalog', JSON.stringify(INITIAL_PRODUCTS));
      }
      if (!localStorage.getItem('nct_categories')) {
        localStorage.setItem('nct_categories', JSON.stringify(INITIAL_CATEGORIES));
      }
      if (!localStorage.getItem('nct_coupons')) {
        localStorage.setItem('nct_coupons', JSON.stringify(INITIAL_COUPONS));
      }
      if (!localStorage.getItem('nct_orders')) {
        localStorage.setItem('nct_orders', JSON.stringify(INITIAL_ORDERS));
      }
      if (!localStorage.getItem('nct_ads_config')) {
        localStorage.setItem('nct_ads_config', JSON.stringify(INITIAL_ADS_CONFIG));
      }
    }

    if (!localStorage.getItem('nct_cart')) {
      localStorage.setItem('nct_cart', JSON.stringify([]));
    }
    if (!localStorage.getItem('nct_wishlist')) {
      localStorage.setItem('nct_wishlist', JSON.stringify([]));
    }
    if (!localStorage.getItem('nct_compare')) {
      localStorage.setItem('nct_compare', JSON.stringify([]));
    }
    if (!localStorage.getItem('nct_theme')) {
      localStorage.setItem('nct_theme', JSON.stringify('light'));
    }
    if (!localStorage.getItem('nct_cookie_consent')) {
      localStorage.setItem('nct_cookie_consent', 'pending');
    }
  }

  static get(key) {
    const rawVal = localStorage.getItem('nct_' + key);
    if (!rawVal) return null;
    try {
      return JSON.parse(rawVal);
    } catch (e) {
      return rawVal;
    }
  }

  static set(key, value) {
    localStorage.setItem('nct_' + key, JSON.stringify(value));
    // Dispatch custom event to update other parts of page
    window.dispatchEvent(new CustomEvent('nct_db_update', { detail: { key, value } }));
  }
}

// Initialize database instantly on script load
StoreDb.init();

// ==========================================================================
// 2. Global State Helpers
// ==========================================================================
export const CartState = {
  getItems() {
    return StoreDb.get('cart') || [];
  },
  addItem(productId, qty = 1, specSelections = {}) {
    const catalog = StoreDb.get('catalog');
    const product = catalog.find(p => p.id === productId);
    if (!product) return;

    let cart = this.getItems();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
      const newQty = cart[existingIndex].qty + qty;
      if (newQty <= product.stock) {
        cart[existingIndex].qty = newQty;
      } else {
        cart[existingIndex].qty = product.stock; // Cap to stock limit
      }
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        condition: product.condition,
        stock: product.stock,
        qty: Math.min(qty, product.stock),
        specs: specSelections
      });
    }
    StoreDb.set('cart', cart);
    this.updateBadges();
  },
  updateQty(productId, qty) {
    let cart = this.getItems();
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.qty = Math.max(1, Math.min(qty, item.stock));
      StoreDb.set('cart', cart);
    }
    this.updateBadges();
  },
  removeItem(productId) {
    let cart = this.getItems();
    cart = cart.filter(item => item.id !== productId);
    StoreDb.set('cart', cart);
    this.updateBadges();
  },
  clear() {
    StoreDb.set('cart', []);
    this.updateBadges();
  },
  updateBadges() {
    const cart = this.getItems();
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'flex' : 'none';
    });
  }
};

export const WishlistState = {
  getItems() {
    return StoreDb.get('wishlist') || [];
  },
  toggleItem(productId) {
    let wishlist = this.getItems();
    const index = wishlist.indexOf(productId);
    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(productId);
    }
    StoreDb.set('wishlist', wishlist);
    this.updateBadges();
  },
  updateBadges() {
    const wishlist = this.getItems();
    const count = wishlist.length;
    const badges = document.querySelectorAll('.wishlist-count-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};

export const CompareState = {
  getItems() {
    return StoreDb.get('compare') || [];
  },
  addItem(productId) {
    let compare = this.getItems();
    if (compare.includes(productId)) return;
    if (compare.length >= 3) {
      alert("You can compare a maximum of 3 products at a time.");
      return;
    }
    compare.push(productId);
    StoreDb.set('compare', compare);
    this.renderDrawer();
  },
  removeItem(productId) {
    let compare = this.getItems();
    compare = compare.filter(id => id !== productId);
    StoreDb.set('compare', compare);
    this.renderDrawer();
  },
  clear() {
    StoreDb.set('compare', []);
    this.renderDrawer();
  },
  renderDrawer() {
    const compare = this.getItems();
    const catalog = StoreDb.get('catalog');
    const drawer = document.getElementById('compare-drawer');
    if (!drawer) return;

    if (compare.length > 0) {
      drawer.classList.add('active');
    } else {
      drawer.classList.remove('active');
    }

    const tray = drawer.querySelector('.compare-tray');
    if (tray) {
      tray.innerHTML = compare.map(id => {
        const prod = catalog.find(p => p.id === id);
        if (!prod) return '';
        return `
          <div class="compare-item-card glass-panel">
            <img src="${prod.image}" alt="${prod.name}" class="compare-item-img">
            <div>
              <div class="compare-item-name" title="${prod.name}">${prod.name}</div>
              <div style="font-size: 0.8rem; font-weight:700; color:var(--color-accent);">N$${prod.price.toLocaleString()}</div>
            </div>
            <button class="compare-remove-btn" data-id="${prod.id}" aria-label="Remove from comparison">
              <i data-lucide="x" style="width:14px; height:14px;"></i>
            </button>
          </div>
        `;
      }).join('');
      // Refresh lucide icons in tray
      if (window.lucide) window.lucide.createIcons();

      // Bind remove buttons
      tray.querySelectorAll('.compare-remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.removeItem(btn.getAttribute('data-id'));
        });
      });
    }

    const countText = drawer.querySelector('.compare-count-text');
    if (countText) {
      countText.textContent = `${compare.length} product(s) selected`;
    }

    const triggerBtn = drawer.querySelector('#compare-trigger-btn');
    if (triggerBtn) {
      triggerBtn.disabled = compare.length < 2;
    }
  }
};

// ==========================================================================
// 3. Global Header and Footer Injections
// ==========================================================================
function injectHeaderFooter() {
  const currentPath = window.location.pathname;
  const isPage = (name) => currentPath.includes(name);

  // Dynamic header rendering
  const headerContainer = document.getElementById('header-mount');
  if (headerContainer) {
    headerContainer.innerHTML = `
      <header class="site-header">
        <div class="container header-container">
          <a href="index.html" class="logo" aria-label="Namibia Computer Technology Investment CC Home">
            <img src="assets/logo.png" alt="NamCompTech Logo" class="header-logo-img">
          </a>

          <nav class="nav-menu">
            <a href="index.html" class="nav-link ${isPage('index.html') || currentPath.endsWith('/') ? 'active' : ''}">Home</a>
            <a href="shop.html" class="nav-link ${isPage('shop.html') ? 'active' : ''}">Shop</a>
            <a href="about.html" class="nav-link ${isPage('about.html') ? 'active' : ''}">About</a>
            <a href="contact.html" class="nav-link ${isPage('contact.html') ? 'active' : ''}">Contact</a>
            <a href="admin.html" class="nav-link ${isPage('admin.html') ? 'active' : ''}">Admin Dashboard</a>
          </nav>

          <div class="header-actions">
            <!-- Search bar -->
            <div class="search-trigger">
              <button class="header-btn" id="search-toggle-btn" aria-label="Open search">
                <i data-lucide="search" style="width:20px; height:20px;"></i>
              </button>
              <div class="search-box-popup glass-panel" id="search-box-popup">
                <form action="shop.html" method="GET" class="search-form-header">
                  <input type="text" name="search" placeholder="Search IT products..." class="search-input-header" required autocomplete="off">
                  <button type="submit" class="search-submit-header" aria-label="Search"><i data-lucide="arrow-right" style="width:16px; height:16px;"></i></button>
                </form>
              </div>
            </div>

            <!-- Theme Toggle -->
            <button class="header-btn" id="theme-toggle-btn" aria-label="Toggle dark/light theme">
              <i data-lucide="sun" class="sun-icon" style="width:20px; height:20px;"></i>
              <i data-lucide="moon" class="moon-icon" style="width:20px; height:20px; display:none;"></i>
            </button>

            <!-- Wishlist -->
            <a href="wishlist.html" class="header-btn" aria-label="Wishlist">
              <i data-lucide="heart" style="width:20px; height:20px;"></i>
              <span class="count-badge wishlist-count-badge" style="display:none;">0</span>
            </a>

            <!-- Shopping Cart -->
            <a href="cart.html" class="header-btn" aria-label="Shopping Cart">
              <i data-lucide="shopping-cart" style="width:20px; height:20px;"></i>
              <span class="count-badge cart-count-badge" style="display:none;">0</span>
            </a>

            <!-- User Profile Link -->
            <a href="account.html" class="header-btn" aria-label="My Account">
              <i data-lucide="user" style="width:20px; height:20px;"></i>
            </a>

            <!-- Hamburger toggle for mobile -->
            <button class="mobile-nav-toggle" id="mobile-nav-toggle-btn" aria-label="Toggle mobile menu">
              <i data-lucide="menu" style="width:24px; height:24px;"></i>
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile drawer menu -->
      <div class="mobile-overlay" id="mobile-overlay"></div>
      <div class="mobile-menu-drawer glass-panel" id="mobile-menu-drawer">
        <a href="index.html" class="nav-link ${isPage('index.html') || currentPath.endsWith('/') ? 'active' : ''}">Home</a>
        <a href="shop.html" class="nav-link ${isPage('shop.html') ? 'active' : ''}">Shop</a>
        <a href="about.html" class="nav-link ${isPage('about.html') ? 'active' : ''}">About</a>
        <a href="contact.html" class="nav-link ${isPage('contact.html') ? 'active' : ''}">Contact</a>
        <a href="admin.html" class="nav-link ${isPage('admin.html') ? 'active' : ''}">Admin Dashboard</a>
        <hr style="border:none; border-top: 1px solid var(--color-border); margin: var(--space-md) 0;">
        <a href="account.html" class="nav-link ${isPage('account.html') ? 'active' : ''}">My Account</a>
        <a href="wishlist.html" class="nav-link ${isPage('wishlist.html') ? 'active' : ''}">My Wishlist</a>
        <a href="cart.html" class="nav-link ${isPage('cart.html') ? 'active' : ''}">Shopping Cart</a>
      </div>
    `;
  }

  // Dynamic footer rendering
  const footerContainer = document.getElementById('footer-mount');
  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <a href="index.html" class="logo" style="margin-bottom:var(--space-md);" aria-label="Namibia Computer Technology Investment CC Home">
                <img src="assets/logo-light.png" alt="NamCompTech Logo" class="footer-logo-img">
              </a>
              <p class="footer-desc">Namibia Computer Technology Investment CC is your premium IT partner in Namibia. Supplying custom rigs, certified hardware, and professional system solutions.</p>
              <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-bottom: var(--space-md); display: flex; flex-direction: column; gap: 6px;">
                <span><strong style="color:white;">Reg No:</strong> CC/2014/14142</span>
                <span><strong style="color:white;">Offices:</strong> Otjiwarongo & Rundu, Namibia</span>
                <span><strong style="color:white;">Phone:</strong> +264 81 202 686</span>
                <span><strong style="color:white;">Email:</strong> namibiamtech@gmail.com</span>
              </div>
              <div class="footer-socials">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Facebook"><i data-lucide="facebook" style="width:18px; height:18px;"></i></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Instagram"><i data-lucide="instagram" style="width:18px; height:18px;"></i></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="LinkedIn"><i data-lucide="linkedin" style="width:18px; height:18px;"></i></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="YouTube"><i data-lucide="youtube" style="width:18px; height:18px;"></i></a>
              </div>
            </div>

            <div class="footer-col">
              <h3>Shop Products</h3>
              <ul class="footer-links">
                <li><a href="shop.html?category=laptops">Premium Laptops</a></li>
                <li><a href="shop.html?category=desktops">Custom Desktops</a></li>
                <li><a href="shop.html?category=components">PC Components</a></li>
                <li><a href="shop.html?category=accessories">Accessories</a></li>
                <li><a href="shop.html?condition=Refurbished">Used & Refurbished</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h3>Company & Trust</h3>
              <ul class="footer-links">
                <li><a href="about.html">About Our Brand</a></li>
                <li><a href="about.html#privacy">Privacy & Cookie Policy</a></li>
                <li><a href="contact.html">Contact Customer Care</a></li>
                <li><a href="admin.html">Merchant Admin Portal</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h3>Newsletter</h3>
              <p class="footer-desc" style="margin-bottom:var(--space-sm);">Subscribe to get early access to restocks, custom build events, and coupon drops.</p>
              <form class="footer-newsletter-form" id="newsletter-footer-form">
                <input type="email" placeholder="Enter your email" class="footer-newsletter-input" required>
                <button type="submit" class="footer-newsletter-btn">Subscribe</button>
              </form>
            </div>
          </div>

          <div class="trust-badges-row">
            <span class="trust-badge-footer"><i data-lucide="shield-check" style="width:14px; height:14px; color:var(--color-accent);"></i> 2-Year Warranty on New Items</span>
            <span class="trust-badge-footer"><i data-lucide="lock" style="width:14px; height:14px; color:var(--color-accent);"></i> Secure 256-bit Checkout</span>
            <span class="trust-badge-footer"><i data-lucide="refresh-cw" style="width:14px; height:14px; color:var(--color-accent);"></i> 30-Day Money Back Returns</span>
          </div>

          <div class="footer-bottom">
            <div class="footer-bottom-container">
              <p>&copy; 2026 Namibia Computer Technology Investment CC. All rights reserved.</p>
              <div class="footer-bottom-links">
                <a href="about.html#privacy">Privacy Policy</a>
                <a href="about.html#cookies">Cookie Settings</a>
                <a href="about.html#terms">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;

    // Bind newsletter submit
    document.getElementById('newsletter-footer-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing to NamCompTech Newsletter! Check your inbox for your 10% welcome coupon.');
      e.target.reset();
    });
  }
}

// ==========================================================================
// 4. Overlays Injection (Cookie Consent, Live Chat, Comparison Drawer)
// ==========================================================================
function injectOverlays() {
  const body = document.body;

  // 1. GDPR Cookie Consent Banner
  const cookieBannerDiv = document.createElement('div');
  cookieBannerDiv.id = 'gdpr-banner';
  cookieBannerDiv.className = 'gdpr-banner glass-panel';
  cookieBannerDiv.innerHTML = `
    <div class="gdpr-title">
      <i data-lucide="cookie" style="width:20px; height:20px; color:var(--color-accent);"></i>
      <strong>Cookie & Privacy Settings</strong>
    </div>
    <p class="gdpr-text">We use cookies to optimize site navigation, analyze store performance, and deliver personalized ads tailored to your tech interests in compliance with the GDPR. Read our <a href="about.html#privacy" style="text-decoration:underline; font-weight:700;">Privacy Policy</a>.</p>
    <div class="gdpr-btns">
      <button class="btn btn-primary" id="cookies-accept-all-btn" style="padding: 6px 14px; font-size: 0.85rem;">Accept All</button>
      <button class="btn btn-secondary" id="cookies-decline-all-btn" style="padding: 6px 14px; font-size: 0.85rem;">Decline</button>
    </div>
  `;
  body.appendChild(cookieBannerDiv);

  // 2. Live Chat Widget (WhatsApp Integration)
  const chatTriggerBtn = document.createElement('a');
  chatTriggerBtn.id = 'live-chat-trigger';
  chatTriggerBtn.className = 'live-chat-trigger';
  chatTriggerBtn.href = 'https://wa.me/26481202686';
  chatTriggerBtn.target = '_blank';
  chatTriggerBtn.rel = 'noopener noreferrer';
  chatTriggerBtn.setAttribute('aria-label', 'Chat with us on WhatsApp');
  // SVG for WhatsApp logo
  chatTriggerBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor" style="display:block;">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.287 1.498 4.793 1.499 5.485 0 9.948-4.414 9.952-9.843.002-2.63-1.019-5.101-2.876-6.958C16.658 2.002 14.19 1 11.999 1 6.514 1 2.051 5.414 2.048 10.845c0 1.63.455 3.218 1.32 4.675L2.39 20.158l4.257-1.004zM17.91 14.67c-.326-.163-1.927-.951-2.226-1.06-.299-.11-.518-.163-.734.163-.217.327-.84.163-1.025.381-.186.217-.373.245-.7.082-.326-.163-1.378-.508-2.625-1.622-.969-.865-1.624-1.933-1.814-2.26-.19-.327-.02-.504.143-.666.147-.145.326-.381.49-.572.162-.19.217-.326.326-.543.11-.217.054-.408-.027-.571-.082-.163-.734-1.767-1.006-2.42-.265-.637-.534-.551-.734-.56-.19-.009-.408-.01-.626-.01-.218 0-.572.082-.871.408-.299.327-1.14 1.115-1.14 2.718 0 1.603 1.168 3.153 1.33 3.37.163.218 2.3 3.51 5.57 4.92.778.334 1.385.534 1.859.684.782.249 1.494.214 2.056.13.627-.093 1.928-.789 2.2-1.51.272-.72.272-1.334.19-1.465-.082-.132-.299-.215-.626-.378z"/>
    </svg>
  `;
  body.appendChild(chatTriggerBtn);


  // 3. Product Comparison Drawer
  const compareDrawerDiv = document.createElement('div');
  compareDrawerDiv.id = 'compare-drawer';
  compareDrawerDiv.className = 'compare-drawer';
  compareDrawerDiv.innerHTML = `
    <div class="compare-header container">
      <div style="display:flex; align-items:center; gap:var(--space-md);">
        <i data-lucide="git-compare" style="color:var(--color-accent); width:20px; height:20px;"></i>
        <strong class="compare-count-text">0 products selected</strong>
      </div>
      <div style="display:flex; gap:var(--space-sm);">
        <button class="btn btn-secondary" id="compare-clear-btn" style="padding: 6px 12px; font-size:0.85rem;">Clear All</button>
        <button class="btn btn-primary" id="compare-trigger-btn" disabled style="padding: 6px 16px; font-size:0.85rem;">Compare Specs</button>
      </div>
    </div>
    <div class="compare-tray container">
      <!-- Injected dynamically -->
    </div>
  `;
  body.appendChild(compareDrawerDiv);

  // 4. Comparison Results Modal (Invisible initially)
  const compareModalOverlay = document.createElement('div');
  compareModalOverlay.id = 'compare-modal-overlay';
  compareModalOverlay.className = 'modal-overlay';
  compareModalOverlay.innerHTML = `
    <div class="modal-box glass-panel" style="max-width:800px; width:95%;">
      <button class="modal-close" id="compare-modal-close-btn" aria-label="Close Comparison modal"><i data-lucide="x" style="width:24px; height:24px;"></i></button>
      <h2 style="margin-bottom:var(--space-lg); display:flex; align-items:center; gap:var(--space-sm);"><i data-lucide="git-compare" style="color:var(--color-accent); width:28px; height:28px;"></i> Side-by-Side Comparison</h2>
      <div style="overflow-x:auto;">
        <table class="compare-modal-table" id="compare-modal-table-content">
          <!-- Injected dynamically -->
        </table>
      </div>
    </div>
  `;
  body.appendChild(compareModalOverlay);
}

// ==========================================================================
// 5. Setup Action Handlers and Theme Controllers
// ==========================================================================
function initTheme() {
  const currentTheme = StoreDb.get('theme') || 'light';
  const themeToggle = document.getElementById('theme-toggle-btn');
  const body = document.body;

  if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    if (themeToggle) {
      themeToggle.querySelector('.sun-icon').style.display = 'none';
      themeToggle.querySelector('.moon-icon').style.display = 'block';
    }
  } else {
    body.classList.remove('dark-theme');
    if (themeToggle) {
      themeToggle.querySelector('.sun-icon').style.display = 'block';
      themeToggle.querySelector('.moon-icon').style.display = 'none';
    }
  }
}

function setupHeaderEvents() {
  // Theme Toggle Event
  document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
    const body = document.body;
    let nextTheme = 'light';
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      nextTheme = 'light';
    } else {
      body.classList.add('dark-theme');
      nextTheme = 'dark';
    }
    StoreDb.set('theme', nextTheme);
    initTheme();
  });

  // Header Search Box Toggle
  const searchBtn = document.getElementById('search-toggle-btn');
  const searchPopup = document.getElementById('search-box-popup');
  searchBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    searchPopup?.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (searchPopup && !searchPopup.contains(e.target) && e.target !== searchBtn) {
      searchPopup.classList.remove('active');
    }
  });

  // Mobile Drawer Toggle
  const burgerBtn = document.getElementById('mobile-nav-toggle-btn');
  const drawer = document.getElementById('mobile-menu-drawer');
  const overlay = document.getElementById('mobile-overlay');

  burgerBtn?.addEventListener('click', () => {
    drawer?.classList.toggle('active');
    overlay?.classList.toggle('active');
  });

  overlay?.addEventListener('click', () => {
    drawer?.classList.remove('active');
    overlay?.classList.remove('active');
  });

  // Scroll Listener for Sticky Header shadow/shrink effect
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load in case page is already scrolled
    handleScroll();
  }
}

function setupCookieBanner() {
  const consent = StoreDb.get('cookie_consent');
  const banner = document.getElementById('gdpr-banner');

  if (consent === 'pending' && banner) {
    banner.classList.add('active');
  }

  document.getElementById('cookies-accept-all-btn')?.addEventListener('click', () => {
    StoreDb.set('cookie_consent', 'accepted');
    banner?.classList.remove('active');
    // Enable personalized ads
    const adsConfig = StoreDb.get('ads_config');
    adsConfig.showPersonalized = true;
    StoreDb.set('ads_config', adsConfig);
    renderAllAds();
  });

  document.getElementById('cookies-decline-all-btn')?.addEventListener('click', () => {
    StoreDb.set('cookie_consent', 'declined');
    banner?.classList.remove('active');
    // Set non-personalized ads
    const adsConfig = StoreDb.get('ads_config');
    adsConfig.showPersonalized = false;
    StoreDb.set('ads_config', adsConfig);
    renderAllAds();
  });
}



function setupCompareEvents() {
  const drawer = document.getElementById('compare-drawer');
  const clearBtn = document.getElementById('compare-clear-btn');
  const triggerBtn = document.getElementById('compare-trigger-btn');
  const modal = document.getElementById('compare-modal-overlay');
  const modalClose = document.getElementById('compare-modal-close-btn');

  clearBtn?.addEventListener('click', () => {
    CompareState.clear();
  });

  triggerBtn?.addEventListener('click', () => {
    renderCompareSpecsTable();
    modal?.classList.add('active');
  });

  modalClose?.addEventListener('click', () => {
    modal?.classList.remove('active');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

function renderCompareSpecsTable() {
  const compare = CompareState.getItems();
  const catalog = StoreDb.get('catalog');
  const table = document.getElementById('compare-modal-table-content');
  if (!table) return;

  const products = compare.map(id => catalog.find(p => p.id === id)).filter(Boolean);

  if (products.length === 0) {
    table.innerHTML = `<tr><td style="padding:var(--space-lg);">No products selected for comparison.</td></tr>`;
    return;
  }

  // Find all unique keys in specs
  const allSpecKeys = new Set();
  products.forEach(p => {
    if (p.specs) {
      Object.keys(p.specs).forEach(k => allSpecKeys.add(k));
    }
  });

  let html = `
    <thead>
      <tr>
        <th style="text-align:left;">Specifications</th>
        ${products.map(p => `
          <th>
            <img src="${p.image}" alt="${p.name}" style="width:80px; height:80px; object-fit:cover; margin:0 auto var(--space-sm) auto; border-radius:var(--radius-sm);">
            <div style="font-size:0.9rem; font-weight:700; line-height:1.2;">${p.name}</div>
            <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--color-accent); margin:4px 0;">${p.condition}</div>
            <div style="font-weight:700; font-size:1.1rem; color:var(--color-accent);">N$${p.price.toLocaleString()}</div>
            <button class="btn btn-primary add-to-cart-compare-btn" data-id="${p.id}" style="padding: 4px 10px; font-size:0.75rem; min-height:30px; margin-top:8px;">Add to Cart</button>
          </th>
        `).join('')}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Category</strong></td>
        ${products.map(p => `<td>${p.category.toUpperCase()}</td>`).join('')}
      </tr>
      <tr>
        <td><strong>Customer Rating</strong></td>
        ${products.map(p => `<td>★ ${p.rating} / 5.0</td>`).join('')}
      </tr>
      <tr>
        <td><strong>Brand</strong></td>
        ${products.map(p => `<td>${p.brand || 'NamComp'}</td>`).join('')}
      </tr>
      <tr>
        <td><strong>Stock Status</strong></td>
        ${products.map(p => `<td>${p.stock > 0 ? `${p.stock} units available` : '<span style="color:var(--color-destructive); font-weight:700;">Out of Stock</span>'}</td>`).join('')}
      </tr>
  `;

  // Specs keys
  allSpecKeys.forEach(key => {
    html += `
      <tr>
        <td><strong>${key}</strong></td>
        ${products.map(p => `<td>${p.specs[key] || 'N/A'}</td>`).join('')}
      </tr>
    `;
  });

  html += `</tbody>`;
  table.innerHTML = html;

  // Bind add-to-cart buttons in table
  table.querySelectorAll('.add-to-cart-compare-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      CartState.addItem(btn.getAttribute('data-id'), 1);
      alert('Product added to your shopping cart.');
      modal?.classList.remove('active');
    });
  });
}

// ==========================================================================
// 6. Google AdSense Simulator
// ==========================================================================
function renderAllAds() {
  const adsConfig = StoreDb.get('ads_config');
  if (!adsConfig.enabled) {
    document.querySelectorAll('.adsense-sim').forEach(ad => ad.classList.remove('active'));
    return;
  }

  const currentPath = window.location.pathname;
  let pageName = 'index';
  if (currentPath.includes('shop.html')) pageName = 'shop';
  else if (currentPath.includes('product.html')) pageName = 'product';
  else if (currentPath.includes('cart.html')) pageName = 'cart';
  else if (currentPath.includes('contact.html')) pageName = 'contact';
  else if (currentPath.includes('admin.html')) pageName = 'admin';

  // Find all adsense mount divs on this page
  const adContainers = document.querySelectorAll(`.adsense-sim[data-page="${pageName}"]`);

  adContainers.forEach(container => {
    const adZoneId = container.getAttribute('id');
    const zone = adsConfig.adZones.find(z => z.id === adZoneId);

    if (zone && zone.active) {
      container.classList.add('active');
      // Update impressions count
      adsConfig.impressions++;
      StoreDb.set('ads_config', adsConfig);

      // Select random ad inventory
      const ads = adsConfig.inventory;
      let selectedAdIndex = 0;
      if (adsConfig.showPersonalized) {
        // High converting targeted item based on ID
        if (adZoneId.includes('hero')) selectedAdIndex = 0;
        else if (adZoneId.includes('sidebar')) selectedAdIndex = 2;
        else if (adZoneId.includes('footer')) selectedAdIndex = 3;
        else selectedAdIndex = Math.floor(Math.random() * ads.length);
      } else {
        // Generic plain privacy-friendly text
        selectedAdIndex = 1;
      }

      const adItem = ads[selectedAdIndex];

      container.innerHTML = `
        <span class="adsense-label">Sponsored Advertisement</span>
        <div class="adsense-content">
          <img src="${adItem.imgUrl}" alt="${adItem.title}" class="adsense-img">
          <div class="adsense-info">
            <h4 class="adsense-title">${adItem.title}</h4>
            <p class="adsense-text">${adItem.text}</p>
            <div class="adsense-advertiser">${adItem.advertiser} &bull; Simulated AdSense Zone</div>
          </div>
          <button class="adsense-cta" data-zone="${adZoneId}">${adItem.cta}</button>
        </div>
      `;

      // Click Event for Simulated AdSense
      container.querySelector('.adsense-cta')?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const activeConfig = StoreDb.get('ads_config');
        activeConfig.clicks++;
        // Generate simulated CPC revenue between N$0.25 and N$1.45
        const cpc = activeConfig.showPersonalized ? (0.45 + Math.random() * 1.00) : (0.15 + Math.random() * 0.40);
        activeConfig.revenue += parseFloat(cpc.toFixed(2));
        StoreDb.set('ads_config', activeConfig);

        alert(`[Simulated Google AdSense click tracker] AdZone: ${adZoneId}\nRevenue generated: +N$${cpc.toFixed(2)} (Personalized: ${activeConfig.showPersonalized})\nStats synced in Admin Dashboard.`);
      });
    } else {
      container.classList.remove('active');
    }
  });
}

// Impression increment scheduler (increases impressions slowly over active browsing)
function initAdTrackerSchedule() {
  setInterval(() => {
    const adsConfig = StoreDb.get('ads_config');
    if (adsConfig.enabled && document.querySelector('.adsense-sim.active')) {
      adsConfig.impressions += Math.floor(Math.random() * 3) + 1;
      StoreDb.set('ads_config', adsConfig);
    }
  }, 12000);
}

// ==========================================================================
// 7. Initialization Trigger
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Injections
  injectHeaderFooter();
  injectOverlays();

  // Load Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Core functions
  initTheme();
  setupHeaderEvents();
  setupCookieBanner();
  setupCompareEvents();

  // Initialize badges
  CartState.updateBadges();
  WishlistState.updateBadges();
  CompareState.renderDrawer();

  // Ads
  renderAllAds();
  initAdTrackerSchedule();
});
