import nodemailer from 'nodemailer';

export const sendEmail = async (data: { title: string; content: string }, receiver?: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'inceptionai.com@gmail.com',
        pass: 'nswr bnoj nudx yzvj',
      },
    });

    // Email content setup
    const mailOptions = {
      from: 'inceptionai.com@gmail.com',
      to: receiver ?? 'contact@inceptionai.ca',
      subject: data.title,
      html: data.content,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Form submitted. Email sent.');
  } catch (error) {
    console.error('Error processing contact form and CV:', error);
    throw error;
  }
};
