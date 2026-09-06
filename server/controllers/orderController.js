import Order from '../models/Order.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (or Private depending on if guest checkout is allowed)
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      customerName,
      customerPhone,
      note,
      userId
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    } else {
      let user;
      if (userId) {
        const foundUser = await User.findById(userId);
        if (foundUser && foundUser.role !== 'admin') {
          user = foundUser;
        }
      }

      if (!user) {
        user = await User.findOne({ phone: customerPhone, role: { $ne: 'admin' } });
      }

      if (!user) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(customerPhone, salt);
        user = new User({
          name: customerName,
          phone: customerPhone,
          passwordHash,
          role: 'customer'
        });
        await user.save();
      } else if (!user.phone && customerPhone) {
        user.phone = customerPhone;
        await user.save();
      }

      const order = new Order({
        user: user._id,
        customerName,
        phone: customerPhone,
        address: shippingAddress.address,
        note,
        items: orderItems.map(item => ({
          product: item.product,
          qty: item.qty,
          priceAtOrder: item.price
        })),
        subtotal: itemsPrice,
        deliveryCharge: shippingPrice,
        total: totalPrice,
        paymentMethod: 'COD',
        status: 'Order Placed'
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public (or Private)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Track order by phone or email
// @route   POST /api/orders/track
// @access  Public
export const trackOrder = async (req, res) => {
  try {
    const { identifier } = req.body;
    
    // Check if identifier is an email by finding the user
    const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
    
    // Find orders by user ID OR by direct phone match
    let query = { phone: identifier };
    if (user) {
      query = { $or: [{ phone: identifier }, { user: user._id }] };
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    if (orders && orders.length > 0) {
      res.json(orders[0]);
    } else {
      res.status(404).json({ message: 'No orders found with that information' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'email name role').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await Order.findByIdAndDelete(req.params.id);
      res.json({ message: 'Order removed successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

