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
import path from 'path';
import fs from 'fs';
import Image from './models/Image.js';

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

app.get('/api', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();

// Permanent MongoDB Atlas image server for /uploads/:filename
app.get('/uploads/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const image = await Image.findOne({ filename });
    if (image) {
      const imgBuffer = Buffer.from(image.data, 'base64');
      res.set('Content-Type', image.contentType || 'image/jpeg');
      res.set('Cache-Control', 'public, max-age=31536000, immutable');
      return res.send(imgBuffer);
    }

    // Check if filename is an ObjectId
    if (filename.match(/^[0-9a-fA-F]{24}$/)) {
      const imgById = await Image.findById(filename);
      if (imgById) {
        const imgBuffer = Buffer.from(imgById.data, 'base64');
        res.set('Content-Type', imgById.contentType || 'image/jpeg');
        res.set('Cache-Control', 'public, max-age=31536000, immutable');
        return res.send(imgBuffer);
      }
    }

    // Fallback to local disk if exists
    const localFile = path.join(__dirname, '../client/public/uploads', filename);
    if (fs.existsSync(localFile)) {
      return res.sendFile(localFile);
    }

    res.status(404).send('Image not found');
  } catch (err) {
    res.status(404).send('Image error');
  }
});

app.use('/uploads', express.static(path.join(__dirname, '../client/public/uploads')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
