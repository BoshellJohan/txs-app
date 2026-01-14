import { transporter } from "./mail.config.js";
import { resetPasswordTemplate } from "./templates/resetPassword.js";

export async function sendPasswordResetEmail(email, token){
    const link = `${process.env.FRONT_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
        to: email,
        subject: 'Reset your password - PRESTEMONOS.COM',
        html: resetPasswordTemplate(link)
    })
}