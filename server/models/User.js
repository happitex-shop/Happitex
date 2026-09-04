import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
