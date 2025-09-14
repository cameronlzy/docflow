import nodemailer from "nodemailer"

export const sendEmail = async (options) => {
  // 1) Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activate in gmail "less secure app" option
    // Gmail only can 500 apps per day not good
  })
  // 2) Defined email options
  const mailOptions = {
    from: "DocFlow <no-reply@docflow-app.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  }
  // 3) Send email
  await transporter.sendMail(mailOptions)
}
