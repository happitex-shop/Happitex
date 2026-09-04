import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import Category from './models/Category.js';
import SiteSettings from './models/SiteSettings.js';

dotenv.config();

const categories = [
  { name: 'Katan', slug: 'katan' },
  { name: 'Jamdani', slug: 'jamdani' },
  { name: 'Rajshahi Silk', slug: 'rajshahi-silk' },
  { name: 'Dhakai Cotton', slug: 'dhakai-cotton' },
  { name: 'Batik', slug: 'batik' },
  { name: 'Dupion Silk', slug: 'dupion-silk' },
  { name: 'Tangail Cotton', slug: 'tangail-cotton' }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await SiteSettings.deleteMany();

    // Create Admin User
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);
    await User.create({
      name: 'Admin',
      phone: '01700000000',
      email: 'admin@happitex.com',
      passwordHash,
      role: 'admin'
    });
    console.log('Admin user created (Phone: 01700000000, Pass: admin123)');

    // Create Categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Categories created:', categories.map(c => c.name).join(', '));
    
    // Find Katan category to attach products to
    const katanCat = createdCategories.find(c => c.slug === 'katan');

    // Create Sample Products based on Figma
    const sampleProducts = [
      {
        name: 'Premium Silk Katan( Pink and Orange mix)',
        price: 8500,
        category: katanCat._id,
        description: 'ম্যাটেরিয়াল: প্রিমিয়াম সফট সিল্ক কাতান\nদৈর্ঘ্য: ১২ হাত\nবহর: ৪৮ ইঞ্চি\nপুরো বডিতে নিখুঁত সুতার কাজ\nসফট ও আরামদায়ক',
        images: ['/assets/sample-product.jpg'],
        status: 'active'
      },
      {
        name: 'Premium Silk Katan(Orange mix)',
        price: 8000,
        category: katanCat._id,
        description: 'ম্যাটেরিয়াল: প্রিমিয়াম সফট সিল্ক কাতান\nদৈর্ঘ্য: ১২ হাত\nবহর: ৪৮ ইঞ্চি\nপুরো বডিতে নিখুঁত সুতার কাজ\nসফট ও আরামদায়ক',
        images: ['/assets/sample-product.jpg'],
        status: 'active'
      },
      {
        name: 'Premium Silk Katan(Black)',
        price: 9000,
        category: katanCat._id,
        description: 'ম্যাটেরিয়াল: প্রিমিয়াম সফট সিল্ক কাতান\nদৈর্ঘ্য: ১২ হাত\nবহর: ৪৮ ইঞ্চি\nপুরো বডিতে নিখুঁত সুতার কাজ\nসফট ও আরামদায়ক',
        images: ['/assets/sample-product.jpg'],
        status: 'active'
      },
      {
        name: 'Premium Silk Katan( Red)',
        price: 8500,
        category: katanCat._id,
        description: 'ম্যাটেরিয়াল: প্রিমিয়াম সফট সিল্ক কাতান\nদৈর্ঘ্য: ১২ হাত\nবহর: ৪৮ ইঞ্চি\nপুরো বডিতে নিখুঁত সুতার কাজ\nসফট ও আরামদায়ক',
        images: ['/assets/sample-product.jpg'],
        status: 'active'
      }
    ];

    await import('./models/Product.js').then(async ({ default: Product }) => {
      await Product.deleteMany();
      await Product.insertMany(sampleProducts);
      console.log('Sample products created');
    });

    // Create SiteSettings
    await SiteSettings.create({
      facebookPageName: 'Happitex',
      facebookLink: 'https://facebook.com/happitex',
      whatsappNumber: '+8801700000000',
      phoneNumber: '+8801700000000',
      email: 'contact@happitex.com'
    });
    console.log('Site settings initialized');

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
