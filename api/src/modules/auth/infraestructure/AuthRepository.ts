import type { PrismaClient, Session, User } from "../../../generated/client";
import { Exceptions } from "../../../shared/exceptions/Exceptions";
import HttpStatus from "../../../shared/http/HttpStatus";
import type AuthUserOut from "../core/domain/AuthUserOut";
import type AuthUserRegisterIn from "../core/domain/AuthUserRegisterIn";
import type Repository from "../core/domain/Repository";

export default class AuthRepository implements Repository {

    constructor(private dbCliente: PrismaClient) {
        this.dbCliente = dbCliente;

    }

    async authenticate(email: string): Promise<User | null> {

        const user = await this.dbCliente.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return null
        }

        return user;
    }

    async saveSession(session: Session): Promise<Session | null> {
        const result = await this.dbCliente.session.create({
            data: {
                userId: session.userId,
                expiresAt: session.expiresAt,
                token: session.token,
            },
            include: {
                user: true,
            },
        });

        if (!result) {
            return null;
        }
        return result;
    }

    async logout(token: string,): Promise<boolean> {
        const session = await this.dbCliente.session.findFirst({
            where: {
                token: token as string,
            }
        });

        if (!session) {
            return false;
        }

        const result = await this.dbCliente.session.update({
            data: {
                deletedAt: new Date(),
            },
            where: {
                id: session.id,
            }
        });

        if (result) {
            return true;
        }

        return false;
    }

    async register(user: AuthUserRegisterIn): Promise<AuthUserOut | null> {
        const existingUser = await this.dbCliente.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if (existingUser) {
            throw new Exceptions("User already exists with this email", HttpStatus.BAD_REQUEST);
        }

        const newUser = await this.dbCliente.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password, // Ensure to hash the password before saving in production
            },
        });

        if (!newUser) {
            throw new Exceptions("Failed to register user", HttpStatus.BAD_REQUEST);
        }

        return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name!,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt || undefined,
            deletedAt: newUser.deletedAt || undefined,
        };


    }
} 