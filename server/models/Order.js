import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  note: { type: String },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    qty: { type: Number, required: true },
    priceAtOrder: { type: Number, required: true }
  }],
  subtotal: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  deliveryArea: { type: String, default: 'Inside Dhaka' },
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: 'COD' },
  status: { 
    type: String, 
    enum: ['Order Placed', 'Order Conformed', 'Shipped', 'On Delivery', 'Received'], 
    default: 'Order Placed' 
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
