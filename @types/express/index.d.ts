
declare global {
  namespace Express {
    interface Request {
      requestId: string;
      token: JWTPayload;
      user: UserResponseDtoType | null;
      queryParams: unknown;
    }
  }
}
