# 🌸 Happitex — Full-Stack E-Commerce Platform
> **বিশ্বস্ত অনলাইন গিফট শপ (Trusted Online Gift Shop)**  
> Premium boutique saree and customized gift e-commerce web application with modern responsive design and comprehensive admin management.

🔗 **Live Storefront:** [https://happitex.vercel.app](https://happitex.vercel.app)

---

## 📖 About Happitex

**Happitex** is a full-stack, cloud-deployed e-commerce solution tailored for boutique saree collections and customized gift orders. It delivers a fast, mobile-first shopping experience with custom Figma-accurate visual geometry, real-time live product search, interactive cart animations, seamless Cash-on-Delivery (COD) checkout, order tracking, direct WhatsApp customer support, and a complete administrative control panel.

---

## ✨ Key Features

### 🛍️ Customer Storefront
- **Signature Hero Showcase**: Diagonal 3-rhombus parallel staircase banner slider with smooth autoplay and custom calligraphy typography.
- **Mobile-First Responsive Header**:
  - Top header with instant search button, user profile modal, and mini-cart drawer.
  - Sub-navigation bar on mobile for fast 1-tap browsing (*Home, Products, Shop Location, Track Order*).
  - Left slide-in mobile navigation drawer with quick support links.
- **Real-Time Live Search**: Instant autocomplete search with thumbnail previews, live price in BDT, and keyboard navigation.
- **Curated Category Collections**: Filterable category pills (Katan, Jamdani, Rajshahi Silk, Dhakai Cotton, Batik, and custom categories).
- **Interactive Shopping Cart**:
  - Curved 2D particle fly-to-cart animation on order click.
  - Slide-out mini cart with real-time quantity steppers and subtotal calculations.
- **Seamless Order Tracking**: Customers can check live delivery milestones (*Order Placed → Order Confirmed → Shipped → On Delivery → Received*) simply by entering their phone number or email.
- **1-Click WhatsApp Support & Ordering**: Direct inquiry button that opens WhatsApp with pre-formatted product details.
- **Interactive Store Location**: Integrated Google Maps and physical address for store visits.

### 🛡️ Admin Management Panel (`/admin`)
- **Order Management**: Real-time status update pipeline, category filters, and an order **Remove** action.
- **Customer Directory**: Registered customer ledger with direct **Remove** capability.
- **Product Management**: Full CRUD product management with auto-fit image aspect ratio and dynamic category creator.
- **Fast Client-Side Image Compression**: Automatic browser canvas compression (max 1000×1400px, 85% quality) ensuring fast uploads and lightweight data transfer.
- **Site Settings & Social Manager**: Dynamic update controls for store contact numbers, WhatsApp, Facebook page link, and email.
- **Admin Profile & Security**: Update admin phone, email, and password securely with Bcrypt encryption.

### ☁️ Permanent Cloud Image Storage
- In-memory buffer image handling streamed directly to **MongoDB Atlas Cloud Storage**.
- Image assets remain 100% persistent and never get deleted or broken across server reboots.
- Automatic `onError` image fallbacks across all product views.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, React Router v7, Context API, Axios |
| **Backend** | Node.js, Express.js (ES Modules), JWT Authentication, Bcrypt |
| **File Handling** | Multer (Memory Storage), HTML5 Canvas Compression |
| **Database** | MongoDB Atlas Cloud Database (Mongoose ODM) |
| **Deployment** | **Vercel** (Frontend Edge CDN) + **Render** (Backend Web Service) |

---

## 📁 Project Structure

```text
Happitex/
├── client/                     # Frontend React SPA
│   ├── public/                 # Static assets, logo, and brand images
│   ├── src/
│   │   ├── components/         # Reusable UI widgets, modals, navbar & footer
│   │   ├── context/            # Global Auth and Cart context providers
│   │   ├── pages/              # Storefront & Admin pages
│   │   └── utils/              # Utility helpers (flyToCart animation)
│   ├── vercel.json             # Vercel reverse-proxy rewrites & SPA routing
│   └── vite.config.js
│
├── server/                     # Backend REST API
│   ├── config/                 # Database connection config
│   ├── controllers/            # Route business logic handlers
│   ├── middleware/             # JWT auth & admin authorization guards
│   ├── models/                 # Mongoose schemas (Product, Order, User, Image, etc.)
│   ├── routes/                 # Express API routes (/api/products, /api/orders, /api/upload)
│   └── server.js               # Express application entrypoint
│
└── README.md
```

---

## 🚀 Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account or local MongoDB instance

### 1. Clone the Repository
```bash
git clone https://github.com/happitex-shop/Happitex.git
cd Happitex
```

### 2. Backend Setup
```bash
cd server
npm install
# Create a .env file with your MONGO_URI and JWT_SECRET
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

The frontend storefront will be available at `http://localhost:5173` and the backend server at `http://localhost:5000`.

---

## 👨‍💻 Developer & Author Information

Developed with ❤️ and meticulous attention to detail by **Md. Yousuf**.

- **Developer:** Md. Yousuf
- **Email:** [mdyousuf2723@gmail.com](mailto:mdyousuf2723@gmail.com)
- **LinkedIn Profile:** [linkedin.com/in/md-yousuf-368a92354](https://www.linkedin.com/in/md-yousuf-368a92354/)

---

## 📄 License & Intellectual Property

**Copyright © 2026 Happitex. All Rights Reserved.**  
**Developed by Md. Yousuf.**

This codebase and associated design assets are proprietary software created for the commercial operation of **Happitex**. 
- **Unauthorized copying, distribution, modification, public display, or commercial exploitation of this codebase, in whole or in part, without the express written permission of the author (Md. Yousuf) and the business owner is strictly prohibited.**
- Any permitted deployment or derivation must preserve all original author attribution, copyright notices, and developer credits.
