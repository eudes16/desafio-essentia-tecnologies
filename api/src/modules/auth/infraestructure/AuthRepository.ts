import type { PrismaClient, Session, User } from "../../../generated/client";
import type Repository from "../core/domain/Repository";

export default class AuthRepository implements Repository {

    constructor(private dbCliente: PrismaClient) {
        this.dbCliente = dbCliente;

    }

    async authenticate(email: string, password: string): Promise<User | null> {
        
        const user = await this.dbCliente.user.findUnique({
            where: {
                email: email
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
    
} 