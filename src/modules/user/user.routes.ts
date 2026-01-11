import { Router } from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.middleware';
import { authorizeRoles } from '../../middlewares/authorizeRoles.middleware';
import UserController from './user.controller';
import { validateRequest } from '../../utils/validateRequest';
import { createUserDtoSchema, forgotPasswordSchema, loginUserDtoSchema, resetPasswordSchema, updateUserDtoSchema } from '../../db/schemas/user.schema';
import uploadFile from '../../middlewares/uploadFile';
import followerRoutes from './follower/follower.routes';

const router = Router();

// Authentication routes
router.post('/register', validateRequest(createUserDtoSchema), UserController.register);
router.post('/login', validateRequest(loginUserDtoSchema), UserController.login);
router.post('/logout', authenticateUser, UserController.logout);
router.get('/refresh', UserController.refresh);

// Verification and Password Reset
router.get('/verify-email', UserController.verifyEmail);
router.post('/forgot-password', validateRequest(forgotPasswordSchema), UserController.forgotPassword);
router.post('/reset-password', validateRequest(resetPasswordSchema), UserController.resetPassword);
router.post('/resend-verification', UserController.resendVerification);

// User profile routes
router.get("/search", UserController.search);
router.get("/username/:username", UserController.getByUsername);
router.get("/:id", authenticateUser, UserController.getById);
router.post("/upload-avatar/:id", authenticateUser, uploadFile.single("avatar"), UserController.uploadAvatar);
router.patch("/update/:id", authenticateUser, validateRequest(updateUserDtoSchema), UserController.update);

// Delete/Restore routes
router.delete("/:id", authenticateUser, UserController.softDelete);
// router.delete('/permanent/:id', authenticateUser, UserController.permanentDelete);
router.post('/restore/:id', authenticateUser, UserController.restore);

// Follower & Following routes
router.use('/', followerRoutes);

export default router;