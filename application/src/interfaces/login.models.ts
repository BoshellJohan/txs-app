export interface LoginRequest {
    email: string,
    password: string
}

export interface LoginResponse {
    success: boolean,
    user: {
        id?: string;
        email: string;
        password: string;
    },
    token: string,
}