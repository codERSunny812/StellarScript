const axios = require("axios");
const crypto = require("crypto");
const submissionModel = require("../models/submission.model");
const executionLogModel = require("../models/executionLog.model");

module.exports.runCode = async (req, res) => {
    const { language, version, projectName, code, input } = req.body;
    const userId = req.user._id;
    const ipAddress = req.ip;

    if (!language || !code || !projectName) {
        return res.status(400).json({ error: "Language, project name, and code are required!" });
    }

    // Generate filename based on language
    const filename = projectName + (
        language === "python" ? ".py" :
            language === "java" ? ".java" :
                language === "javascript" ? ".js" :
                    language === "c" ? ".c" :
                        language === "cpp" ? ".cpp" :
                            language === "go" ? ".go" : ""
    );

    try {
        const startTime = performance.now();

        const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
            language,
            version,
            files: [{ filename, content: code }],
            stdin: input || "", // User input (if any)
            args: [],
            compile_timeout: 5000,  // Timeout to prevent long execution
            run_timeout: 5000,
            memory_limit: 512000000, // 512 MB memory limit
        });

        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);

        const { stdout, stderr, run_time, memory_usage } = response.data;

        // Generate hash for plagiarism detection
        const hash = crypto.createHash("sha256").update(code).digest("hex");

        // Check for plagiarism
        const similarSubmissions = await submissionModel.find({ hash });
        const isPlagiarized = similarSubmissions.length > 0;

        // Store submission
        const newSubmission = new submissionModel({ userId, language, code, hash, output: stdout || stderr, executionTime });
        await newSubmission.save();

        // Store execution log
        const executionLog = new executionLogModel({ userId, ipAddress, executionTime, memoryUsage: memory_usage, isFlagged: isPlagiarized });
        await executionLog.save();

        res.status(200).json({ output: stdout || stderr, executionTime, memoryUsage: memory_usage, isPlagiarized });

    } catch (error) {
        console.error("Execution Error:", error);
        res.status(500).json({ error: "Code execution failed!" });
    }
};


module.exports.getSubmission=async(req,res)=>{
    try {
        const submissions = await submissionModel.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch submissions!" });
    }

}
