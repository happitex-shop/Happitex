import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
      index: true,
    },
    contentType: {
      type: String,
      required: true,
      default: 'image/jpeg',
    },
    data: {
      type: String,
      required: true, // Base64 encoded image string
    },
    size: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model('Image', imageSchema);

export default Image;
