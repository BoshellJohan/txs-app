export interface LoginRequest {
    username: string,
    password: string
}

export interface LoginResponse {
    success: boolean,
    user: {
        id?: string;
        username: string;
        password: string;
    }
}