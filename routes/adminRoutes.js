const express = require('express');
const { adminLogin, createClient, getClients, registerAdmin, deleteClients } = require('../controllers/adminControllers');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', adminLogin);
router.post('/register-admin', registerAdmin )
router.post('/clients', protect, createClient);
router.get('/clients', protect, getClients);
router.delete('/clients', protect, deleteClients);

router.get('/verify', protect, (req, res) => {
    res.status(200).json({ message: 'Token is valid' });
  });
  

module.exports = router;
