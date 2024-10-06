const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Use routes
// backend/src/index.js
app.use('/api/admin', adminRoutes);
// app.use(async (req, res, next) => {
//   try {
//     const clientDomain = req.query.clientDomain; 
//     if (!clientDomain) {
//       return res.status(400).send('Client domain is required');
//     }

//     const client = await Client.findOne({ domain: clientDomain });

//     if (!client) {
//       return res.status(404).send('Client not found');
//     }

//     req.client = client; 
//     next();
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// });

app.use('/api/clients', clientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
