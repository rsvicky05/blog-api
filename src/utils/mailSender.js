const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  secure: true, // Use true for port 465, false for port 587
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "rsvigneshwaran05@gmail.com",
    pass: "dkeurxezxmhrizxz",
  },
});

// Send an email using async/await
async function send(to, sub, message){
  const info = await transporter.sendMail({
    to: to,
    subject: sub,
    //text: , // Plain-text version of the message
    html: `
    <h1>${sub}</h1><p>${message}</p>`, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
}

module.exports = send;