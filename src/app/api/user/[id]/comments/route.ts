import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const userId = params.id;

        const comments = await prisma.comment.findMany({
            where: {
                userId,
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                recipe: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                diet: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            },
        });

        return NextResponse.json(comments);
    } catch (error) {
        console.error('[USER_COMMENTS_GET_ERROR]', error);
        return NextResponse.json(
            { error: 'Error al obtener los comentarios del usuario' },
            { status: 500 }
        );
    }
}
