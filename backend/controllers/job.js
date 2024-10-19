const Job = require('../models/Job');

const postJob = async (req, res) => {
    const { title, description, experienceLevel, endDate, userId } = req.body;
    const job = new Job({ title, description, experienceLevel, endDate, userId  });
    await job.save();
    res.json({ success: 1, message: 'Job posted!' });
};

module.exports = { postJob };