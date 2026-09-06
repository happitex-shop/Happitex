# 🌸 Happitex — Full-Stack E-Commerce Platform
> **বিশ্বস্ত অনলাইন গিফট শপ (Trusted Online Gift Shop)**  
> Premium boutique saree and customized gift e-commerce web application with modern responsive design and comprehensive admin management.

🔗 **Live Storefront:** [https://happitex.vercel.app](https://happitex.vercel.app)

---

## 📖 About Happitex

**Happitex** is a full-stack, cloud-deployed e-commerce solution tailored for boutique saree collections and customized gift orders. It delivers a fast, mobile-first shopping experience with custom Figma-accurate visual geometry, real-time live product search, interactive cart animations, seamless Cash-on-Delivery (COD) checkout, order tracking, direct WhatsApp customer support, and a complete administrative control panel.

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
