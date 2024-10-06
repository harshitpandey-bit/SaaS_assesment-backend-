const Client = require('../models/Client');
const FormSubmission = require('../models/FormSubmission');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')

const submitForm = async (req, res) => {
  const { token, name, email, message } = req.body;
  console.log(req.body)


  try {
    const decodedId = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decodedId)
    const client = await Client.findById(decodedId.id);
    if (!client) {return res.status(404).json({ message: 'Client not found' });}
    const newSubmission = new FormSubmission({ clientId: client._id, name, email, message, });
    await newSubmission.save();

    // Send email notification to the client's configured email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    console.log(client)
    const resp = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: client.email,
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return res.status(201).json({ message: 'Form submission successful', response: resp });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Failed to submit the form' });
  }
};

module.exports = { submitForm };
