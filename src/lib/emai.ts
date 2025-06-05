// src/lib/email.ts
'use server';
import nodemailer from 'nodemailer';

export async function sendWelcomeEmail(to: string, name: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false // QUITAR EN PRODUCCION!!!
        }
    });

    const recipesLink = `${process.env.NEXT_PUBLIC_BASE_URL}/recipes`

    const htmlContent = `
    <html>
    <body>
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fff8f2; padding: 2rem; border-radius: 12px; border: 1px solid #f0e0d6; max-width: 600px; margin: auto;">
    <div style="text-align: center;">
      <h1 style="color: #7d4e2d;">¡Bienvenido a Ryu Recipes ${name} 👋!</h1>
      <p style="color: #4a3c31; font-size: 1.1rem;">
        Gracias por unirte a nuestra comunidad acogedora de amantes de la cocina.
      </p>
      <hr style="margin: 1.5rem 0; border: none; border-top: 1px dashed #d9c6b5;" />
    </div>

    <div style="color: #4a3c31; font-size: 1rem; line-height: 1.6;">
      <p>Desde ahora puedes:</p>
      <ul>
        <li>📖 Subir tus recetas favoritas</li>
        <li>🌱 Crear y compartir dietas personalizadas</li>
        <li>🍳 Guardar menús para la semana</li>
      </ul>
      <p>
        Tu viaje culinario comienza aquí. ¡Esperamos que encuentres inspiración, sabor y comunidad!
      </p>
    </div>

    <div style="text-align: center; margin-top: 2rem;">
      <a href="${recipesLink}" style="padding: 0.8rem 1.5rem; background-color: #a67458; color: white; border-radius: 8px; text-decoration: none; font-weight: bold;">
        Empieza a explorar!
      </a>
    </div>

    <p style="color: #a7988e; font-size: 0.8rem; text-align: center; margin-top: 2rem;">
      Si no fuiste tú quien creó esta cuenta, ignora este mensaje.
    </p>
  </div>
  </body>
  </html>
`;

    const info = await transporter.sendMail({
        from: `"Ryu Recipes" <${process.env.EMAIL_USER}>`,
        to,
        subject: '¡Bienvenido a Ryu Recipes!',
        html: htmlContent,
    });

    return info;
}

export async function sendVerifyEmail(email: string, token: string) {
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false // QUITAR EN PRODUCCION!!!
        }
    });

    const htmlContent = `<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Verificación de Cuenta</title>
  </head>
  <body style="font-family: Arial, sans-serif; padding: 2rem; color: #333;">
    <div style="max-width: 600px; margin: auto; background-color: #fffaf5; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #a67458;">¡Bienvenido a Ryu Recipes!</h2>
      <p>Gracias por registrarte. Antes de comenzar, necesitamos verificar tu dirección de correo electrónico.</p>
      <p>Haz clic en el siguiente botón para activar tu cuenta:</p>
      <a href="${verificationLink}"
        style="display: inline-block; margin-top: 1rem; padding: 0.8rem 1.5rem; background-color: #a67458; color: white; border-radius: 8px; text-decoration: none; font-weight: bold;">
        Verificar mi cuenta
      </a>
      <p style="margin-top: 2rem; font-size: 0.9rem; color: #666;">
        Si tú no creaste esta cuenta, puedes ignorar este mensaje.
      </p>
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e0dcd7;" />
      <p style="font-size: 0.8rem; color: #aaa;">Ryu Recipes — Cocina con alma.</p>
    </div>
  </body>
</html>`

    const info = await transporter.sendMail({
        from: `"Ryu Recipes" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verifica tu cuenta',
        html: htmlContent,
    });

    return info;
}
