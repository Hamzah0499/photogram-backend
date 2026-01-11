"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDTO = void 0;
const userDTO = (user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    type: user.type,
    bio: user.bio,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    phone: user.phone,
    isVerified: user.isVerified,
    isBlocked: user.isBlocked,
    isActive: user.isActive || true,
    createdAt: user.createdAt || null,
    updatedAt: user.updatedAt || null,
});
exports.userDTO = userDTO;
//# sourceMappingURL=user.dto.js.map