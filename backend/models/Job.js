const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
    title: String,
    description: String,
    experienceLevel: String,
    endDate: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Job', JobSchema);