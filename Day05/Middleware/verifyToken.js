import jwt from "jsonwebtoken";

let verifyToken = (req, res, next) => {
    let token = req.headers.token; // <-- fix typo here
    if (!token) return res.status(401).json({ message: "Token required" });

    jwt.verify(token, "iti", (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid Token" });
        req.decoded = decoded;
        next();
    });
};

export default verifyToken;