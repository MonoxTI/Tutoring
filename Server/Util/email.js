import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

// Function to send confirmation email with PDF invoice
export const sendAppointmentConfirmation = async (appointment) => {
  // appointment: {
  //   FullName, Email, Number, package, date, tutor, invoiceNumber, AmountPaid
  // }

  const { FullName, Email, Number, package: pkg, date, tutor, invoiceNumber, AmountPaid } = appointment;

  // 1️⃣ Create PDF invoice
  const invoicePath = path.join("./temp", `Invoice_${invoiceNumber}.pdf`);
  fs.mkdirSync("./temp", { recursive: true }); // Ensure temp folder exists

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(invoicePath));

  doc.fontSize(20).text("Invoice", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Invoice Number: ${invoiceNumber}`);
  doc.text(`Name: ${FullName}`);
  doc.text(`Email: ${Email}`);
  doc.text(`Package: ${pkg}`);
  doc.text(`Tutor: ${tutor}`);
  doc.text(`Number of Sessions: ${Number}`);
  doc.text(`Date: ${date}`);
  doc.text(`Amount Paid: $${AmountPaid.toFixed(2)}`);

  doc.end();

  // 2️⃣ Configure Nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 3️⃣ Email content
  const mailOptions = {
    from: `"Tutoring Platform" <${process.env.EMAIL_USER}>`,
    to: Email,
    subject: "Appointment Confirmation & Invoice",
    text: `Hello ${FullName},

Your appointment has been confirmed:

- Package: ${pkg}
- Tutor: ${tutor}
- Number of Sessions: ${Number}
- Date: ${date}

Please find your invoice attached.

Thank you for booking with us!`,
    attachments: [
      {
        filename: `Invoice_${invoiceNumber}.pdf`,
        path: invoicePath,
      },
    ],
  };

  // 4️⃣ Send email
  await transporter.sendMail(mailOptions);

  // Optional: delete temp file after sending
  fs.unlinkSync(invoicePath);

  console.log(`Confirmation email sent to ${Email}`);
};
