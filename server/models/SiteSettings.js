import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  facebookPageName: { type: String, default: '' },
  facebookLink: { type: String, default: '' },
  whatsappNumber: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  email: { type: String, default: '' }
}, { timestamps: true });

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
export default SiteSettings;
