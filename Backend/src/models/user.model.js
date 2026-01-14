import { string } from 'mathjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    isActive: {
        type: Boolean
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

export default mongoose.model('User', userSchema);