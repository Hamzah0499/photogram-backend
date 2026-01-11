import { JwtPayload } from 'jsonwebtoken';
declare class JWTService {
    static signAccessToken(payload: object): string;
    static signRefreshToken(payload: object): string;
    static verifyAccessToken(token: string): JwtPayload;
    static verifyRefreshToken(token: string): JwtPayload;
    static signResetToken(payload: object): string;
    static verifyResetToken(token: string): JwtPayload;
    static signAccountVerificationToken(payload: object): string;
    static verifyAccountVerificationToken(token: string): JwtPayload;
}
export default JWTService;
//# sourceMappingURL=JWT.service.d.ts.map