const executionLogSchema = new mongoose.Schema({
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
    submission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'submission',
        required: true
    },
    executionTime: {
        type: Number, // Time taken in milliseconds
        required: true
    },
    memoryUsage: {
        type: Number // Memory used in MB
    },
    output: {
        type: String
    },
    error: {
        type: String
    },
    executedAt: {
        type: Date,
        default: Date.now
    },
    ipAddress: {
        type: String
    }
});

const executionLogModel = mongoose.model('executionLog', executionLogSchema);

module.exports = executionLogModel;
