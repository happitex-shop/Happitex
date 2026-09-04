import Settings from '../models/Settings.js';

// @desc    Get settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({});
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({});
    if (!settings) {
      settings = await Settings.create({});
    }

    settings.facebookName = req.body.facebookName || settings.facebookName;
    settings.facebookLink = req.body.facebookLink || settings.facebookLink;
    settings.whatsappNumber = req.body.whatsappNumber || settings.whatsappNumber;
    settings.phoneNumber = req.body.phoneNumber || settings.phoneNumber;
    settings.email = req.body.email || settings.email;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
