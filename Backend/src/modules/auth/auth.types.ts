export interface IJwtPayload {
    _id: string;
    email: string;
    role: string;
    isActive: boolean;
    iat?: number;
    exp?: number;
}

export interface IJwtRefreshPayload {
    _id: string;
    email: string;
    iat?: number;
    exp?: number;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    name: string;
}

export interface ResetPasswordDto {
    passwordToken: string;
    newPassword: string;
}

export interface PublicUser {
    _id: string,
    email: string,
    role: string,
    isActive: boolean;
}