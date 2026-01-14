export interface IJwtPayload {
    _id: string;
    email: string;
    iat?: number;
    exp?: number;
}