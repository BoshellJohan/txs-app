export interface IUserDB {
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

export interface IUserAuth {
    _id: string;
    email: string;
    role: 'solicitante' | 'inversionista' | 'admin';
}

export interface IUserPublic {
    _id: string;
    email: string;
    role: 'solicitante' | 'inversionista' | 'admin';
}