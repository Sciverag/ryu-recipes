import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return NextResponse.json({ error: 'Usuario o Contraseña incorrectos' }, { status: 404 })
        }

        if (!user.isVerified) {
            return NextResponse.json({ error: 'Usuario no validado' }, { status: 404 })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return NextResponse.json({ error: 'Usuario o Contraseña incorrectos' }, { status: 401 })
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name, image: user.image, createdAt: user.createdAt, updatedAt: user.updatedAt },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        )

        return NextResponse.json({ token, user: { name: user.name, email: user.email } })

    } catch (error) {
        return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 })
    }
}
