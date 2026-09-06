import path from 'path';
import express from 'express';
import multer from 'multer';
import Image from '../models/Image.js';

const router = express.Router();

// Use memory storage so we can store directly in MongoDB Atlas (persists forever)
const storage = multer.memoryStorage();

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|svg|gif|jfif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = /image\/(jpeg|jpg|png|webp|svg\+xml|gif)/.test(file.mimetype);

  if (extname || mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only (jpg, jpeg, png, webp, gif, svg)!'));
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// @desc    Upload image to MongoDB Atlas
// @route   POST /api/upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const ext = path.extname(req.file.originalname) || '.jpg';
    const filename = `image-${Date.now()}-${Math.floor(Math.random() * 1000000)}${ext}`;

    const savedImage = await Image.create({
      filename,
      contentType: req.file.mimetype || 'image/jpeg',
      data: req.file.buffer.toString('base64'),
      size: req.file.size,
    });

    res.status(201).json({
      message: 'Image Uploaded Successfully',
      image: `/uploads/${savedImage.filename}`,
      fileUrl: `/api/upload/file/${savedImage._id}`,
      id: savedImage._id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message || 'Image upload failed' });
  }
});

// @desc    Upload image as base64 string
// @route   POST /api/upload/base64
router.post('/base64', async (req, res) => {
  try {
    const { data, contentType, filename: customName } = req.body;
    if (!data) {
      return res.status(400).json({ message: 'No image data provided' });
    }

    // Strip prefix if present (e.g. data:image/png;base64,...)
    const cleanBase64 = data.replace(/^data:image\/[a-z]+;base64,/, '');
    const filename = customName || `image-${Date.now()}-${Math.floor(Math.random() * 1000000)}.jpg`;

    const savedImage = await Image.create({
      filename,
      contentType: contentType || 'image/jpeg',
      data: cleanBase64,
      size: Buffer.byteLength(cleanBase64, 'base64'),
    });

    res.status(201).json({
      message: 'Image Uploaded Successfully',
      image: `/uploads/${savedImage.filename}`,
      fileUrl: `/api/upload/file/${savedImage._id}`,
      id: savedImage._id,
    });
  } catch (error) {
    console.error('Base64 upload error:', error);
    res.status(500).json({ message: error.message || 'Image upload failed' });
  }
});

// @desc    Get image by MongoDB ID
// @route   GET /api/upload/file/:id
router.get('/file/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).send('Image not found');
    }

    const imgBuffer = Buffer.from(image.data, 'base64');
    res.set('Content-Type', image.contentType);
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(imgBuffer);
  } catch (error) {
    res.status(404).send('Image not found');
  }
});

// @desc    Get image by filename
// @route   GET /api/upload/name/:filename
router.get('/name/:filename', async (req, res) => {
  try {
    const image = await Image.findOne({ filename: req.params.filename });
    if (!image) {
      return res.status(404).send('Image not found');
    }

    const imgBuffer = Buffer.from(image.data, 'base64');
    res.set('Content-Type', image.contentType);
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(imgBuffer);
  } catch (error) {
    res.status(404).send('Image not found');
  }
});

export default router;
