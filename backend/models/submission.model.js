const mongoose = require('mongoose');
const crypto = require('node:crypto'); // ✅ Use built-in crypto module

const submissionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projectModel',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
        enum: ['python', 'javascript', 'java', 'c++', 'c#', 'go', 'other']
    },
    submissionDate: {
        type: Date,
        default: Date.now
    },
    codeHash: {
        type: String,
        required: true
    },
    plagiarismFlag: {
        type: Boolean,
        default: false
    }
});

// ✅ Hash the code before saving to detect plagiarism
submissionSchema.pre('save', function (next) {
    this.codeHash = crypto.createHash('sha256').update(this.code).digest('hex');
    next();
});

const submissionModel = mongoose.model('submission', submissionSchema);

module.exports = submissionModel;
