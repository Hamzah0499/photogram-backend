"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTService {
    //*** User Auth Tokens
    static signAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
    }
    static signRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
    }
    static verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }
    static verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }
    //*** for password reset tokens
    static signResetToken(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.RESET_TOKEN_SECRET, { expiresIn: process.env.RESET_TOKEN_EXPIRATION });
    }
    static verifyResetToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.RESET_TOKEN_SECRET);
    }
    // //*** for Account Verification tokens
    static signAccountVerificationToken(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.AccountVerification_TOKEN_SECRET, { expiresIn: process.env.AccountVerification_TOKEN_EXPIRATION });
    }
    static verifyAccountVerificationToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.AccountVerification_TOKEN_SECRET);
    }
}
exports.default = JWTService;
//# sourceMappingURL=JWT.service.js.map