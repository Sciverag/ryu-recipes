// src/app/api/user/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { LogedUser } from '@/types/General';
import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

export async function GET(
    req: NextRequest,
    context: { params: { id: string } }
) {
    const { id } = await context.params;
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
        const userId = await params.id;
        const body = await req.json();
        const { name, email } = body;

        if (!name || !email) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser && existingUser.id !== userId) {
            return NextResponse.json({ error: 'Ese email ya está en uso' }, { status: 409 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                email,
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
        return NextResponse.json({ error: 'Error al actualizar el usuario' }, { status: 500 });
    }
}