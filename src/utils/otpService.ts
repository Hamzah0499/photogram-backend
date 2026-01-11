// import crypto from "crypto";
// import { sendMail } from "./emailTransporter";

// // interface OTPResult {
// //     status: number;
// //     success: boolean;
// //     message: string;
// // }

// const OTP_LENGTH = 8;
// const OTP_EXPIRY_MINUTES = 30;
// const MAX_ATTEMPTS = 4;

// /**
//  * Generate secure 8-character alphanumeric OTP
//  */
// function generateAlphanumericOTP(length: number): string {
//     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     const bytes = crypto.randomBytes(length);
//     let otp = "";

//     for (let i = 0; i < length; i++) {
//         otp += chars[bytes[i] % chars.length];
//     }

//     return otp;
// }

// // **
// //  * Generate OTP for two-factor authentication
// //  **

// export async function generateTwoFactorOTP(
//     user: selectUserDtoType
// ): Promise<any> {
//     if (!user.twoFactorAuthEnabled) {
//         return {
//             status: 400,
//             success: false,
//             message: "Two-factor authentication is not enabled.",
//         };
//     }

//     const otp = generateAlphanumericOTP(OTP_LENGTH);
//     const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

//     // Update generated OTP in DB
//     await userRepository.UPDATE_TWO_FACTOR_AUTH(user, {
//         twoFactorAuthCode: otp,
//         twoFactorAuthExpiresAt: expiresAt,
//         twoFactorAuthAttempts: 0,
//     })

//     // console.log(`>>> OTP for ${user.email}: ${otp}`);
//     // DONE: Send login email
//     await sendMail({
//         to: user.email,
//         subject: "Login to KIPS Publications",
//         template: "user/login",
//         data: {
//             name: user.firstName,
//             otpCode: otp,
//             time: new Date().toLocaleString("en-US", {
//                 hour12: true,
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric",
//             }),
//             frontend: process.env.FRONTEND_URL,
//         },
//     });

//     return {
//         status: 200,
//         success: true,
//         message: "OTP sent to your email.",
//     };
// }

// export async function verifyTwoFactorOTP(
//     user: selectUserDtoType,
//     otp: string
// ): Promise<any> {
//     if (!user.twoFactorAuthCode || !user.twoFactorAuthExpiresAt) {
//         return {
//             status: 400,
//             success: false,
//             message: "No OTP request found.",
//         };
//     }

//     if ((user.twoFactorAuthAttempts ?? 0) >= MAX_ATTEMPTS) {
//         return {
//             status: 429,
//             success: false,
//             message: "Too many invalid attempts.",
//         };
//     }

//     if (user.twoFactorAuthExpiresAt < new Date()) {
//         return {
//             status: 400,
//             success: false,
//             message: "OTP has expired.",
//         };
//     }

//     if (otp !== user.twoFactorAuthCode) {
//         // await db
//         //     .update(userSchema)
//         //     .set({
//         //         twoFactorAuthAttempts: (user?.twoFactorAuthAttempts ?? 0) + 1,
//         //     })
//         //     .where(eq(userSchema.id, user.id));
//         await userRepository.UPDATE_TWO_FACTOR_AUTH(user, {
//             twoFactorAuthAttempts: (user?.twoFactorAuthAttempts ?? 0) + 1,
//         })

//         return {
//             status: 400,
//             success: false,
//             message: "Invalid OTP.",
//         };
//     }

//     // OTP verified – clear it
//     await userRepository.UPDATE_TWO_FACTOR_AUTH(user, {
//         twoFactorAuthCode: null,
//         twoFactorAuthExpiresAt: null,
//         twoFactorAuthAttempts: 0,
//     });
//     // await db
//     //     .update(userSchema)
//     //     .set({
//     //         twoFactorAuthCode: null,
//     //         twoFactorAuthExpiresAt: null,
//     //         twoFactorAuthAttempts: 0,
//     //     })
//     //     .where(eq(userSchema.id, user.id));

//     return {
//         status: 200,
//         success: true,
//         message: "OTP verified successfully.",
//     };
// }


// // **
// //  * Generate OTP for two-factor authentication
// //  **

// export async function generateAccountVerificationOTP(
//     user: selectUserDtoType
// ): Promise<any> {
//     const otp = generateAlphanumericOTP(OTP_LENGTH);
//     const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

//     // Update generated OTP in DB
//     await userRepository.UPDATE_ACCOUNT_VERIFICATION(user, {
//         accVerificationCode: otp,
//         accVerificationExpiresAt: expiresAt,
//         accVerificationAttempts: 0,
//     })

//     // TODO: send email
//     console.log(`>>> ACCOUNT VERIFICATION OTP for ${user.id}: ${otp}`)


//     return {
//         otpCode: otp,
//         status: 200,
//         success: true,
//         message: "Account verification OTP sent to your email.",
//     };
// }

// export async function verifyAccountVerificationOTP(
//     user: selectUserDtoType,
//     otp: string
// ): Promise<any> {
//     if (!user.accVerificationCode || !user.accVerificationExpiresAt) {
//         return {
//             status: 400,
//             success: false,
//             message: "No OTP request found.",
//         };
//     }

//     if ((user.accVerificationAttempts ?? 0) >= MAX_ATTEMPTS) {
//         return {
//             status: 429,
//             success: false,
//             message: "Too many invalid attempts.",
//         };
//     }

//     if (user.accVerificationExpiresAt < new Date()) {
//         return {
//             status: 400,
//             success: false,
//             message: "OTP has expired.",
//         };
//     }

//     if (otp !== user.accVerificationCode) {
//         await userRepository.UPDATE_ACCOUNT_VERIFICATION(user, {
//             accVerificationAttempts: (user?.accVerificationAttempts ?? 0) + 1,
//         })

//         return {
//             status: 400,
//             success: false,
//             message: "Invalid OTP.",
//         };
//     }

//     // OTP verified – clear it
//     await userRepository.UPDATE_ACCOUNT_VERIFICATION(user, {
//         accVerificationCode: null,
//         // accVerificationExpiresAt: null,
//         accVerificationAttempts: 0,
//         isVerified: true,
//     });

//     return {
//         status: 200,
//         success: true,
//         message: "Account verification OTP verified successfully.",
//     };
// }
