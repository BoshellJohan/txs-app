export type UserType = {
    userid: number;
    email: string;
    password: string;
    role: 'applicant' | 'investor' | 'admin';
    passwordRecoveryToken?: string;
    passwordRecoveryExpires?: Date;
    refreshTokens?: any;
}

export type RefreshTokenType = {
    refreshTokenId: string;
    token: string;
    userId: string;
    createdAt: Date;
}

export interface IUserAuth {
    _id: string;
    email: string;
    role: 'applicant' | 'investor' | 'admin';
}

export interface AddRefreshToken {
    email: string,
    token: string
}