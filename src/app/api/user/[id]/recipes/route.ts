import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const userId = params.id;

        const recipes = await prisma.recipe.findMany({
            where: {
                authorId: userId,
            },
            select: {
                id: true,
                title: true,
                description: true,
                coverImage: true,
                videoUrl: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(recipes);
    } catch (error) {
        console.error('[USER_RECIPES_GET_ERROR]', error);
        return NextResponse.json(
            { error: 'Error al obtener las recetas del usuario' },
            { status: 500 }
        );
    }
}
