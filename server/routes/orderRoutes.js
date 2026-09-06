import express from 'express';
import { addOrderItems, getOrderById, trackOrder, getOrders, updateOrderStatus, getMyOrders, deleteOrder } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(addOrderItems) // Allow public guest checkout for now based on UI
  .get(protect, admin, getOrders);

router.route('/myorders')
  .get(protect, getMyOrders);

router.route('/track')
  .post(trackOrder);

router.route('/:id')
  .get(getOrderById)
  .delete(protect, admin, deleteOrder);

router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

export default router;
