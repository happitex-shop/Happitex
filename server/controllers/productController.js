import Product from '../models/Product.js';

// @desc    Get all products (with optional category filter)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const categoryFilter = req.query.category ? { category: req.query.category } : {};
    const products = await Product.find({ ...categoryFilter, status: 'active' }).populate('category', 'name slug');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, image, deliveryCharge, deliveryChargeInside, deliveryChargeOutside } = req.body;
    
    const product = new Product({
      name,
      price,
      category,
      description,
      deliveryCharge: deliveryChargeOutside || deliveryCharge || 120,
      deliveryChargeInside: deliveryChargeInside !== undefined ? Number(deliveryChargeInside) : 60,
      deliveryChargeOutside: deliveryChargeOutside !== undefined ? Number(deliveryChargeOutside) : (deliveryCharge || 120),
      images: [image],
      status: 'active'
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, images, image, category, status, deliveryCharge, deliveryChargeInside, deliveryChargeOutside } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.images = image ? [image] : (images || product.images);
      product.category = category || product.category;
      product.status = status || product.status;
      if (deliveryCharge !== undefined) product.deliveryCharge = Number(deliveryCharge);
      if (deliveryChargeInside !== undefined) product.deliveryChargeInside = Number(deliveryChargeInside);
      if (deliveryChargeOutside !== undefined) product.deliveryChargeOutside = Number(deliveryChargeOutside);

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
