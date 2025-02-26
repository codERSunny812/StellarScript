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
    executionTime: {
        type: Number, // Time taken in milliseconds
        required: true
    },
    memoryUsage: {
        type: Number // Memory used in MB
    },
    executedAt: {
        type: Date,
        default: Date.now
    },
    ipAddress: {
        type: String
    },
    isFlagged: { type: Boolean, default: false }, // Fraud detection flag
});

const executionLogModel = mongoose.model('executionLog', executionLogSchema);

module.exports = executionLogModel;
