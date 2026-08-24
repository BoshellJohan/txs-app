export interface UserDB {
    _id: string;
    email: string;
    password: string;
    name: string;
    isActive: boolean;
    role: 'solicitante' | 'inversionista' | 'admin';
    refreshTokens: {token: string, createdAt: Date}[];
    passwordRecoveryToken?: string;
    passwordRecoveryExpires?: Date;
}

export interface UserClient {
    _id: string;
    email: string;
    password?: string;
    name: string;
    isActive: boolean;
    role: 'solicitante' | 'inversionista' | 'admin';
    refreshTokens?: {token: string, createdAt: Date}[];
    passwordRecoveryToken?: string;
    passwordRecoveryExpires?: Date;
}

export interface IUserAuth {
    _id: string;
    email: string;
    role: 'solicitante' | 'inversionista' | 'admin';
}

export interface AddRefreshToken {
    email: string,
    token: string
}