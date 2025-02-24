const crypto = require('crypto');
const submissionModel = require('../models/submission.model');

async function checkPlagiarism(code) {
    const hash = crypto.createHash('sha256').update(code).digest('hex');
    const existingSubmissions = await submissionModel.find({ codeHash: hash });

    if (existingSubmissions.length > 0) {
        return { isPlagiarized: true, message: "Potential plagiarism detected!" };
    }
    return { isPlagiarized: false };
}
