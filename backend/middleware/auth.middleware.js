const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({ success: false, msg: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        req.user = user; // Attach user to the request
        next();
    } catch (error) {
        return res.status(401).json({ success: false, msg: "Invalid token" });
    }
};

module.exports = authMiddleware;
