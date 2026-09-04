import mongoose from 'mongoose';

const settingsSchema = mongoose.Schema(
  {
    facebookName: { type: String, default: 'Happitex' },
    facebookLink: { type: String, default: '' },
    whatsappNumber: { type: String, default: '+880 1830-439602' },
    phoneNumber: { type: String, default: '+880 1830-439602' },
    email: { type: String, default: 'anamul8505@gmail.com' },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
