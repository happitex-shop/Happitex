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
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(req.body.password, salt);
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
