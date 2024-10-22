import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "kumahfrederick2@gmail.com",
        pass: process.env.MAIL_PASS_KEY
    },
    from: "kumahfrederick2@gmail.com"
})