export interface IJwtPayload {
    _id: string;
    email: string;
    role: string,
    isActive: boolean,
    iat?: number;
    exp?: number;
}