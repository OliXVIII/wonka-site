import nodemailer from 'nodemailer';

export const sendEmail = async (data: { title: string; content: string }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'contact@inceptionai.ca',
        pass: 'buwsYf-paxxi2-motqof',
      },
    });

    // Email content setup
    const mailOptions = {
      from: 'contact@inceptionai.ca',
      to: 'contact@inceptionai.ca',
      subject: data.title,
      text: data.content,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Form submitted. Email sent.');
  } catch (error) {
    console.error('Error processing contact form and CV:', error);
    throw error;
  }
};
