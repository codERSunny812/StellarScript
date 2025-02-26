const executionLogSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    ipAddress: { type: String, required: true },
    executionTime: { type: String, required: true },
    memoryUsage: { type: String, required: true },
    isFlagged: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const executionLogModel = mongoose.model('executionLog', executionLogSchema);

module.exports = executionLogModel;
