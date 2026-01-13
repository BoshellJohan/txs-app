const { string } = require('mathjs');
const mongoose = require('mongoose');

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
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);