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
        type: String
    },
    refreshTokens: [
        {
            token: String,
            createdAt: { type: Date, default: Date.now }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);