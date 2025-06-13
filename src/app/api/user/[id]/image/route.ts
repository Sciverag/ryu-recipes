// src/app/api/user/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { LogedUser } from '@/types/General';
import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        let decoded

        try {
            decoded = jwtDecode<LogedUser & { exp: number }>(token);
        } catch {
            return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
        }

        if (decoded.id !== params.id) {
            return NextResponse.json({ error: 'No tienes permisos' }, { status: 403 });
        }
        const userId = params.id;
        const body = await req.json();
        const { image } = body;

        if (!image) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                image
            },
            select: {
                id: true,
                name: true,
                email: true,
                updatedAt: true,
                image: true,
                createdAt: true
            },
        });

        const newtoken = jwt.sign(
            { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name, image: updatedUser.image, createdAt: updatedUser.createdAt, updatedAt: updatedUser.updatedAt },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        )

        return NextResponse.json({ newtoken, updatedUser });
    } catch (error) {
        console.error('[USER_UPDATE_ERROR]', error);
        return NextResponse.json({ error: 'Error al actualizar la imagen del usuario' }, { status: 500 });
    }
}