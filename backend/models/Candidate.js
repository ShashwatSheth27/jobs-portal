const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  }
});

module.exports = mongoose.model('Candidate', CandidateSchema);
