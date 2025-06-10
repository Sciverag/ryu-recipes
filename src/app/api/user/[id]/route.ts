// src/app/api/user/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    context: { params: { id: string } }
) {
    const { id } = context.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('[USER_GET_ERROR]', error);
        return NextResponse.json({ error: 'Error al obtener el usuario' }, { status: 500 });
    }
}
