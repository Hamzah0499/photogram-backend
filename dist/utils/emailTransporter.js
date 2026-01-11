"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const transporter = nodemailer_1.default.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const sendMail = async ({ to, subject, template, data, }) => {
    try {
        const templatePath = path_1.default.join(process.cwd(), "src", "templates", "emails", `${template}.ejs`);
        const html = await ejs_1.default.renderFile(templatePath, data);
        const info = await transporter.sendMail({
            from: `"Photogram from Hamzah" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        console.log(`>>>: Email sent to: ${to},\n Email id: ${info.messageId}`);
    }
    catch (error) {
        console.error("Email sending failed:", error);
        throw new Error("Unable to send email");
    }
};
exports.sendMail = sendMail;
//# sourceMappingURL=emailTransporter.js.map