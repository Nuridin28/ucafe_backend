import jwt from "jsonwebtoken";

export const checkAdmin = (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

    if (token) {
        try {
            const decoded = jwt.verify(token, "secret123");

            if (decoded.role !== "admin") {
                return res.status(403).json({
                    message: "Access denied. Admins only.",
                });
            }

            req.userId = decoded._id;
            req.userRole = decoded.role;
            next();
        } catch (e) {
            return res.status(403).json({
                message: "No access",
            });
        }
    } else {
        return res.status(403).json({
            message: "No access",
        });
    }
};
