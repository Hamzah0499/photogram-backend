type SendMailOptions = {
    to: string;
    subject: string;
    template: string;
    data: Record<string, any>;
};
export declare const sendMail: ({ to, subject, template, data, }: SendMailOptions) => Promise<void>;
export {};
//# sourceMappingURL=emailTransporter.d.ts.map