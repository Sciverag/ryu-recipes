import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json({ error: 'Token no proporcionado' }, { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: { verificationToken: token },
        });

        if (!user) {
            return NextResponse.json({ error: 'Token inválido o usuario no encontrado' }, { status: 404 });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationToken: null,
                verificationTokenExpires: null
            },
        });

        return NextResponse.json({ message: 'Cuenta verificada correctamente' });
    } catch (error) {
        console.error('[VERIFICATION_ERROR]', error);
        return NextResponse.json({ error: 'Error del servidor al verificar' }, { status: 500 });
    }
}
