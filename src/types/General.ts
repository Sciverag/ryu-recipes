import { User } from "@/generated/prisma";

export type LogedUser = Omit<User, 'password' | 'isVerified' | 'verificationToken' | 'verificationTokenExpires'>;