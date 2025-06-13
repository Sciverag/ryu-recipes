import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const creatorId = params.id;

        const diets = await prisma.diet.findMany({
            where: {
                creatorId,
            },
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return NextResponse.json(diets);
    } catch (error) {
        console.error('[USER_DIETS_GET_ERROR]', error);
        return NextResponse.json(
            { error: 'Error al obtener las dietas del usuario' },
            { status: 500 }
        );
    }
}
