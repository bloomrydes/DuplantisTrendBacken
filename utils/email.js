// services/emailService.js
const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  try {
    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.Mail_Id, // Sender's email
        pass: process.env.Mail_Password, // App-specific password
      },
    });

    // Send email
    let info = await transporter.sendMail({
      from: process.env.Mail_Id, // Sender's email
      to: data.to, // Recipient's email
      subject: data.subject, // Email subject
      html: data.html, // HTML body
    });

    console.log("Email sent:", info.response);
    return info; // Return the email info response
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent.");
  }
};

module.exports = { sendEmail };
