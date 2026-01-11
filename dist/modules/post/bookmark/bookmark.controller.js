"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkController = void 0;
const bookmark_service_1 = require("./bookmark.service");
const http_status_codes_1 = require("http-status-codes");
exports.BookmarkController = {
    toggle: async (req, res, next) => {
        const userId = req.user.id;
        const postId = Number(req.params.postId);
        const result = await bookmark_service_1.bookmarkService.toggleBookmark(userId, postId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    },
    getMyBookmarks: async (req, res, next) => {
        const userId = req.user.id;
        const result = await bookmark_service_1.bookmarkService.getMyBookmarks(userId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    },
    getCount: async (req, res, next) => {
        const postId = Number(req.params.postId);
        const count = await bookmark_service_1.bookmarkService.getBookmarkCount(postId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ count });
    }
};
//# sourceMappingURL=bookmark.controller.js.map