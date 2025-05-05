import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // o usa 'hotmail', 'outlook'...
      auth: {
        user: process.env.CONTACT_EMAIL, // tu correo
        pass: process.env.CONTACT_PASS,   // tu contraseña o app password
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.CONTACT_EMAIL,
      subject: `Nuevo mensaje de ${name}`,
      text: message,
      html: `
        <h2>Mensaje desde el portfolio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong><br/>${message}</p>
      `,
    });

    return res.status(200).json({ message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al enviar el mensaje' });
  }
}
