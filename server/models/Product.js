import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, required: true },
  deliveryCharge: { type: Number, default: 120 },
  images: [{ type: String }],
  status: { type: String, enum: ['active', 'draft', 'out_of_stock'], default: 'active' }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
