const Admin = require('../models/Admin');
const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin login
const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, password: hashedPassword });
    if (!admin) return res.status(401).json({ message: 'something goes wrong' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};


// Create client
const createClient = async (req, res) => {
  const { domain, logo, heading, email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = new Client({ domain, logo, heading, email, username, password: hashedPassword });
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error creating client' });
  }
};

// Get all clients
const getClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients' });
  }
};
// Get all clients
const deleteClients = async (req, res) => {
  const id = req.query.id
  try {
    const delResp = await Client.deleteOne({_id:id});
    res.status(200).json(delResp);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting clients' });
  }
};

module.exports = {deleteClients, adminLogin, createClient, getClients, registerAdmin };
