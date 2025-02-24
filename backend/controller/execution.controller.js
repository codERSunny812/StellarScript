const executionLogModel = require('../models/executionLog.model');

async function detectIPFraud(ipAddress) {
    const users = await executionLogModel.distinct("user", { ipAddress });

    if (users.length > 1) {
        return { isFraudulent: true, message: "Multiple accounts detected from the same IP!" };
    }
    return { isFraudulent: false };
}
