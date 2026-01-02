import { User } from "./user.models"

export interface RegisterRequest {
    email: string,
    password: string,
    name: string
}

export interface RegisterResponse {
    success: boolean,
    token: string,
    user: User
}