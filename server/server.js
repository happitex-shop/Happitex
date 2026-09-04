import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

import User from './models/User.js';
import Category from './models/Category.js';
import SiteSettings from './models/SiteSettings.js';
import bcrypt from 'bcrypt';

dotenv.config();

const initDB = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'Admin',
        phone: '01700000000',
        email: 'admin@happitex.com',
        passwordHash,
        role: 'admin'
      });
      console.log('Default Admin user created: 01700000000 / admin123');
    }

    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      const defaultCategories = [
        { name: 'Katan', slug: 'katan' },
        { name: 'Jamdani', slug: 'jamdani' },
        { name: 'Rajshahi Silk', slug: 'rajshahi-silk' },
        { name: 'Dhakai Cotton', slug: 'dhakai-cotton' },
        { name: 'Batik', slug: 'batik' }
      ];
      await Category.insertMany(defaultCategories);
      console.log('Default categories initialized');
    }

    const settingsExists = await SiteSettings.findOne();
    if (!settingsExists) {
      await SiteSettings.create({
        facebookPageName: 'Happitex',
        facebookLink: 'https://facebook.com/happitex',
        whatsappNumber: '+8801830439602',
        phoneNumber: '+8801830439602',
        email: 'anamul8505@gmail.com',
        address: 'Sirajgonj, Rajshahi'
      });
      console.log('Default site settings initialized');
    }
  } catch (err) {
    console.error('Error during auto-initialization:', err);
  }
};

connectDB().then(() => initDB());

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

import path from 'path';

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '../client/public/uploads')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
