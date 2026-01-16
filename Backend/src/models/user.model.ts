import mongoose, { model } from 'mongoose';
import { UserDB } from '../modules/users/user.types.js';

const userSchema = new mongoose.Schema<UserDB>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['solicitante', 'inversionista', 'admin'],
        default: 'solicitante'
    },
    refreshTokens: [
        {
            token: String,
            createdAt: { type: Date, default: Date.now }
        }
    ],
    passwordRecoveryToken: {
        type: String
    },
    passwordRecoveryExpires: {
        type: Date
    }
}, {
    timestamps: true
});

export const UserModel = model<UserDB>('User', userSchema);