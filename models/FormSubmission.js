// backend/src/models/FormSubmission.js
const mongoose = require('mongoose');

const FormSubmissionSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FormSubmission', FormSubmissionSchema);
