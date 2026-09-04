import Category from '../models/Category.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const trimmedName = name.trim();
    let slug = req.body.slug && req.body.slug.trim() 
      ? req.body.slug.trim() 
      : trimmedName.toLowerCase().replace(/\s+/g, '-');
    
    if (!slug) {
      slug = `cat-${Date.now()}`;
    }

    const escapedName = trimmedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const categoryExists = await Category.findOne({
      $or: [
        { name: { $regex: new RegExp(`^${escapedName}$`, 'i') } },
        { slug: { $regex: new RegExp(`^${escapedSlug}$`, 'i') } }
      ]
    });

    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await Category.create({ name: trimmedName, slug });
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      await category.deleteOne();
      res.json({ message: 'Category removed' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
