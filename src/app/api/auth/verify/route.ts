import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get('token');

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

    return NextResponse.redirect(new URL('/login', req.url));
}
