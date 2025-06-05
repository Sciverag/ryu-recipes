import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { addMinutes } from 'date-fns';
import { sendVerifyEmail, sendWelcomeEmail } from '@/lib/emai';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Campos incompletos' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: 'Este correo ya está registrado' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = crypto.randomBytes(32).toString('hex');
        const tokenExpires = addMinutes(new Date(), 30);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                verificationToken: token,
                verificationTokenExpires: tokenExpires,
            },
        });

        await sendWelcomeEmail(email, name)

        await sendVerifyEmail(email, token)

        return NextResponse.json({ message: 'Usuario creado correctamente', user }, { status: 201 });
    } catch (error) {
        console.error('[REGISTER_ERROR]', error);
        return NextResponse.json({ error: 'Error al registrar usuario' }, { status: 500 });
    }
}
