const mongoose = require('mongoose');


const submissionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    language: { type: String, required: true },
    code: { type: String, required: true },
    hash: { type: String, required: true }, // For plagiarism detection
    output: { type: String, required: true },
    executionTime: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});


const submissionModel = mongoose.model('submission', submissionSchema);

module.exports = submissionModel;
