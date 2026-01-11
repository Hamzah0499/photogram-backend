import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';


const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});



type SendMailOptions = {
    to: string;
    subject: string;
    template: string;
    data: Record<string, any>;
};


export const sendMail = async ({
    to,
    subject,
    template,
    data,
}: SendMailOptions) => {
    try {
        const templatePath = path.join(
            process.cwd(),
            "src",
            "templates",
            "emails",
            `${template}.ejs`
        );

        const html = await ejs.renderFile(templatePath, data);

        const info = await transporter.sendMail({
            from: `"Photogram from Hamzah" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log(`>>>: Email sent to: ${to},\n Email id: ${info.messageId}`);
    } catch (error) {
        console.error("Email sending failed:", error);
        throw new Error("Unable to send email");
    }
};
