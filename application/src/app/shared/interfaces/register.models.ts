import { User } from "./user.models"

export interface RegisterRequest {
    email: string,
    password: string,
    name: string
}

export interface RegisterResponse {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: User
}