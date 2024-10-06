const express = require('express');
const { submitForm } = require('../controllers/clientControllers');
const FormSubmission = require('../models/FormSubmission');
const Client = require('../models/Client');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require("jsonwebtoken")

const router = express.Router();

router.post('/form-submit',
  //   [
  //   body('name').not().isEmpty().withMessage('Name is required'),
  //   body('email').isEmail().withMessage('Please include a valid email'),
  //   body('message').not().isEmpty().withMessage('Message is required'),
  // ],
  // (req, res, next) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  //   next();
  // }, 
  submitForm);

  router.get('/submissions', async function getSubmissions(req, res){
    try {
      const data = await FormSubmission.find({})
      return res.json({data})
    } catch (error) {
      return res.status(403).json({error})
    }
  })

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const client = await Client.findOne({ username });

  console.log(username, password)

  if (!client || !(await bcrypt.compare(password, client.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
});
 router.post("/client-info", async(req, res) => {
  try {
    const token = req.body.token
    console.log(token)
  const decodedId = jwt.verify(token, process.env.JWT_SECRET)
  console.log(decodedId)
  const client = await Client.findById(decodedId.id);
  if (!client) return res.status(404).json({ message: 'Client not found' });

  return  res.status(200).json({client})
 }
  catch (error) {
    return res.status(401).json({ message: 'something goes wrong', error }); 
  }
 })
  
module.exports = router;
