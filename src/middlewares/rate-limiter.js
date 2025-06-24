import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        error: "Trop de requêtes depuis cette IP, réessayez dans 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default rateLimiter;