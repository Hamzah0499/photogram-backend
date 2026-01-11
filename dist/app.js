"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const index_imports_1 = require("./index.imports");
// 3rd party middleware
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "uploads")));
app.use((0, cors_1.default)({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
}));
//  Api response Handler
app.use(index_imports_1.responseHandler);
// REST API routes
app.use("/api/v1/user", index_imports_1.userRoutes);
app.use("/api/v1/post", index_imports_1.postRoutes);
app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Welcome to Photogram an Instagram Clone Backend Server!",
        Environment: process.env.NODE_ENV,
    });
});
app.get("/health", async (req, res) => {
    res.status(200).json({
        message: "Server is running!",
        Environment: process.env.NODE_ENV,
    });
});
// Error handling middleware
app.use(index_imports_1.errorHandler.handleError);
app.listen(process.env.PORT, () => {
    const date = new Date().toLocaleString();
    console.log(`
    Date: ${date}
    Environment: ${process.env.NODE_ENV}
    Server running on http://localhost:${process.env.PORT}\n=============================================\n`);
});
exports.default = app;
//# sourceMappingURL=app.js.map