import express from 'express';
import { loginUser, registerUser, loginAdmin, getUserProfile, updateUserProfile, getUsers, deleteUser } from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin/login', loginAdmin);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
  
router.get('/users', protect, admin, getUsers);
router.delete('/users/:id', protect, admin, deleteUser);

export default router;
