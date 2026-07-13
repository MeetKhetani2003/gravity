import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Configure transporter using env vars
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `Gravity Industries Website <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // sending it to themselves as an inquiry
      replyTo: data.email,
      subject: `Website Inquiry: ${data.name} - ${data.interest || data.productName || 'General'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Inquiry Received</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
            </tr>
            ${data.company ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.company}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone}</td>
            </tr>
            ${data.city ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">City</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.city}</td>
            </tr>` : ''}
            ${data.interest ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Interest</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.interest}</td>
            </tr>` : ''}
            ${data.productName ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Product</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.productName}</td>
            </tr>` : ''}
            ${data.brandName ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Brand</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.brandName}</td>
            </tr>` : ''}
          </table>
          <h3 style="margin-top: 30px; font-size: 16px;">Message:</h3>
          <p style="padding: 15px; background: #f8fafc; border-radius: 8px; white-space: pre-wrap;">${data.message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Inquiry sent successfully." }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, message: "Failed to send inquiry." }, { status: 500 });
  }
}
