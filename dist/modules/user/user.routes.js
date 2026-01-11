"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateUser_middleware_1 = require("../../middlewares/authenticateUser.middleware");
const user_controller_1 = __importDefault(require("./user.controller"));
const validateRequest_1 = require("../../utils/validateRequest");
const user_schema_1 = require("../../db/schemas/user.schema");
const uploadFile_1 = __importDefault(require("../../middlewares/uploadFile"));
const follower_routes_1 = __importDefault(require("./follower/follower.routes"));
const router = (0, express_1.Router)();
// Authentication routes
router.post('/register', (0, validateRequest_1.validateRequest)(user_schema_1.createUserDtoSchema), user_controller_1.default.register);
router.post('/login', (0, validateRequest_1.validateRequest)(user_schema_1.loginUserDtoSchema), user_controller_1.default.login);
router.post('/logout', authenticateUser_middleware_1.authenticateUser, user_controller_1.default.logout);
router.get('/refresh', user_controller_1.default.refresh);
// Verification and Password Reset
router.get('/verify-email', user_controller_1.default.verifyEmail);
router.post('/forgot-password', (0, validateRequest_1.validateRequest)(user_schema_1.forgotPasswordSchema), user_controller_1.default.forgotPassword);
router.post('/reset-password', (0, validateRequest_1.validateRequest)(user_schema_1.resetPasswordSchema), user_controller_1.default.resetPassword);
router.post('/resend-verification', user_controller_1.default.resendVerification);
// User profile routes
router.get("/search", user_controller_1.default.search);
router.get("/username/:username", user_controller_1.default.getByUsername);
router.get("/:id", authenticateUser_middleware_1.authenticateUser, user_controller_1.default.getById);
router.post("/upload-avatar/:id", authenticateUser_middleware_1.authenticateUser, uploadFile_1.default.single("avatar"), user_controller_1.default.uploadAvatar);
router.patch("/update/:id", authenticateUser_middleware_1.authenticateUser, (0, validateRequest_1.validateRequest)(user_schema_1.updateUserDtoSchema), user_controller_1.default.update);
// Delete/Restore routes
router.delete("/:id", authenticateUser_middleware_1.authenticateUser, user_controller_1.default.softDelete);
// router.delete('/permanent/:id', authenticateUser, UserController.permanentDelete);
router.post('/restore/:id', authenticateUser_middleware_1.authenticateUser, user_controller_1.default.restore);
// Follower & Following routes
router.use('/', follower_routes_1.default);
exports.default = router;
//# sourceMappingURL=user.routes.js.map