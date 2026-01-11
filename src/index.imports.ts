// Middlewares
import responseHandler from './middlewares/responseHandler';
import errorHandler from './middlewares/errorHandler';
import { authenticateUser } from './middlewares/authenticateUser.middleware';
import { authorizeRoles } from './middlewares/authorizeRoles.middleware';

// Routes
import userRoutes from './modules/user/user.routes';
import postRoutes from './modules/post/post.routes';

export {
    // middlewares
    responseHandler, errorHandler, authenticateUser, authorizeRoles,
    // routes
    userRoutes, postRoutes
}