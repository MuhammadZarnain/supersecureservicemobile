// server.js
const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./auth/auth');
const { User,Report } = require('./auth/sequelize');
const dotenv = require('dotenv');
const router = require('./auth/router');
const { Sequelize } = require('sequelize');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

// Initialize the database
initDatabase();

// Helper function to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

/**
 * Email/Password Login and User Endpoints
 */

// API endpoint to fetch a single user by Email and Password (traditional login)
app.post('/api/reports', async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    if (!title || !userId) {
      return res.status(400).json({ error: 'Missing title or userId' });
    }

    const newReport = await Report.create({ title, description, userId });
    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/reports/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const reports = await Report.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/reports/:id', async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/user', async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ where: { Email, Password } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } else {
      return res.status(200).json({ user });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/user-phone', async (req, res) => {
  try {
    const { Phone, Password } = req.body;
    const user = await User.findOne({ where: { Phone, Password } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } else {
      return res.status(200).json({ user });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// API endpoint to fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll({ order: ['createdAt'] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API endpoint to fetch a user by ID
app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API endpoint to update a user by ID
app.put('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { Name, Email, Phone, Password } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.Name = Name;
    user.Email = Email;
    user.Phone = Phone;
    user.Password = Password;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API endpoint to create a new user
app.post('/api/newusers', async (req, res) => {
  try {
    const { Name, Email, Phone, Password } = req.body;

    // Check if email or phone already exists
    const existingUser = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ Email }, { Phone }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or phone number already exists' });
    }

    const newUser = await User.create({ Name, Email, Phone, Password });
    return res.status(201).json(newUser);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * SMS/OTP Endpoints for Phone Number Login
 */

// Endpoint to send OTP via SMS (simulate sending SMS)
app.post('/api/sms/send', async (req, res) => {
  const { Phone } = req.body;
  if (!Phone) return res.status(400).json({ error: "Phone number is required" });

  const otp = generateOTP();

  try {
    // Find existing user by phone; if not, create one with the provided phone number.
    let user = await User.findOne({ where: { Phone } });
    if (!user) {
      // In a production app, you might choose to enforce user registration first.
      user = await User.create({ Phone, otp });
    } else {
      // Update the OTP field for the user.
      user.otp = otp;
      await user.save();
    }

    // Simulate sending SMS. Replace the console.log with your SMS provider API call.
    console.log(`Sending OTP ${otp} to phone ${Phone}`);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("SMS send error:", error);
    return res.status(500).json({ error: "Failed to send SMS" });
  }
});

// Endpoint to verify OTP sent via SMS
app.post('/api/sms/verify', async (req, res) => {
  const { Phone, otp } = req.body;
  if (!Phone || !otp) return res.status(400).json({ error: "Phone number and OTP are required" });

  try {
    const user = await User.findOne({ where: { Phone, otp } });
    if (!user) {
      return res.status(401).json({ error: "Invalid OTP" });
    }
    // On successful OTP verification, you can generate a JWT or create a session.
    return res.status(200).json({ message: "OTP verified", userId: user.id });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Start the server on the configured port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
