import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

class JWTService {

    //*** User Auth Tokens
    static signAccessToken(payload: object): string {
        return jwt.sign(payload, (process.env.ACCESS_TOKEN_SECRET as string), { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION } as SignOptions);
    }

    static signRefreshToken(payload: object): string {
        return jwt.sign(payload, (process.env.REFRESH_TOKEN_SECRET as string), { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION } as SignOptions);
    }

    static verifyAccessToken(token: string): JwtPayload {
        return jwt.verify(token, (process.env.ACCESS_TOKEN_SECRET as string)) as JwtPayload;
    }

    static verifyRefreshToken(token: string): JwtPayload {
        return jwt.verify(token, (process.env.REFRESH_TOKEN_SECRET as string)) as JwtPayload;
    }

    //*** for password reset tokens
    static signResetToken(payload: object): string {
        return jwt.sign(payload, (process.env.RESET_TOKEN_SECRET as string), { expiresIn: process.env.RESET_TOKEN_EXPIRATION } as SignOptions);
    }

    static verifyResetToken(token: string): JwtPayload {
        return jwt.verify(token, (process.env.RESET_TOKEN_SECRET as string)) as JwtPayload;
    }

    // //*** for Account Verification tokens
    static signAccountVerificationToken(payload: object): string {
        return jwt.sign(payload, (process.env.AccountVerification_TOKEN_SECRET as string), { expiresIn: process.env.AccountVerification_TOKEN_EXPIRATION } as SignOptions);
    }
    static verifyAccountVerificationToken(token: string): JwtPayload {
        return jwt.verify(token, (process.env.AccountVerification_TOKEN_SECRET as string)) as JwtPayload;
    }

}


export default JWTService;