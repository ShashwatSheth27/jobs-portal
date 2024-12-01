const Job = require('../models/Job');
const Candidate = require('../models/Candidate');
const emailController = require('./email');

const postJob = async (req, res) => {
    const { title, description, experienceLevel, endDate, userId, candidateEmails } = req.body;
    const job = new Job({ title, description, experienceLevel, endDate, userId  });
    await job.save();
    let msg = 'Job posted.';
    if(job) {
        const candidateRes = addJobCandidates(job._id, candidateEmails);
        if(candidateRes) {
            msg += ' Candiate added to the job';
            const emailRes = emailController.sendJobAlert(job, candidateEmails);
            if(emailRes) msg += ' Job alerts sent to candidate';
        }
    }
    res.json({ success: 1, message: msg });
};

const fetchJobs = async (req, res) => {
    let response = {success : 0};
    const { userId } = req.body;
    if(userId) {
        const jobs = await Job.find({ userId }).sort({ _id: -1});
        if(jobs) {
            response = { success: 1, data: jobs};
        }
    }
    res.json(response);
}

async function addJobCandidates(job, candidate_emails){
    if(!job || !candidate_emails || !Array.isArray(candidate_emails)) return false;
    for (const email of candidate_emails) {
        const candidate = new Candidate({email, job});
        await candidate.save();
    }
    return true;
}
module.exports = { postJob, fetchJobs };