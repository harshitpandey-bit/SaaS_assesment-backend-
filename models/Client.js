const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  domain: { type: String, required: true, unique: true },
  logo: String,
  heading: String,
  email: { type: String, required: true },
  username: String,
  password: String,
});

module.exports = mongoose.model('Client', ClientSchema);
