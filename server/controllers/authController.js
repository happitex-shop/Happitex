import User from '../models/User.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({ 
    $or: [{ email: identifier }, { phone: identifier }] 
  });

  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    const token = generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      token
    });
  } else {
    res.status(401).json({ message: 'Invalid phone/email or password' });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  let { name, phone, email, password } = req.body;

  // Make empty strings undefined for sparse indexes
  if (!phone) phone = undefined;
  if (!email) email = undefined;

  let userExists;
  if (phone) {
    userExists = await User.findOne({ phone });
  } else if (email) {
    userExists = await User.findOne({ email });
  }

  if (userExists) {
    return res.status(400).json({ message: 'User already exists with this information' });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    phone,
    email,
    passwordHash
  });

  if (user) {
    const token = generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      token
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Auth admin & get token (Admin Login)
// @route   POST /api/auth/admin/login
// @access  Public
export const loginAdmin = async (req, res) => {
  const { identifier, password } = req.body; 

  const user = await User.findOne({ 
    $or: [{ phone: identifier }, { email: identifier }],
    role: 'admin' 
  });

  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    const token = generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      token
    });
  } else {
    res.status(401).json({ message: 'Invalid admin credentials' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      if (req.body.phone && req.body.phone.trim() && req.body.phone.trim() !== user.phone) {
        const phoneExists = await User.findOne({ phone: req.body.phone.trim(), _id: { $ne: user._id } });
        if (phoneExists) {
          return res.status(400).json({ message: 'Phone number already in use' });
        }
        user.phone = req.body.phone.trim();
      }

      if (req.body.email !== undefined) {
        const trimmedEmail = req.body.email ? req.body.email.trim() : '';
        if (trimmedEmail && trimmedEmail !== user.email) {
          const emailExists = await User.findOne({ email: trimmedEmail, _id: { $ne: user._id } });
          if (emailExists) {
            return res.status(400).json({ message: 'Email already in use' });
          }
          user.email = trimmedEmail;
        } else if (!trimmedEmail) {
          user.email = undefined;
        }
      }

      if (req.body.name && req.body.name.trim()) {
        user.name = req.body.name.trim();
      }

      if (req.body.password && req.body.password.trim()) {
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(req.body.password.trim(), salt);
      }

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        phone: updatedUser.phone,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: error.message || 'Server error updating profile' });
  }
};

// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-passwordHash');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete user
// @route   DELETE /api/auth/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.role === 'admin') {
        return res.status(400).json({ message: 'Cannot delete admin user' });
      }
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User removed successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

