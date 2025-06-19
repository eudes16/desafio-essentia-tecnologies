import type { PrismaClient } from "../../../generated/client";
import type Repository from "../core/domain/Repository";
import type UserCreateIn from "../core/domain/UserCreateIn";
import type UserDeleteIn from "../core/domain/UserDeleteIn";
import type UserOut from "../core/domain/UserOut";
import type UserUpdateIn from "../core/domain/UserUpdateIn";

export default class UserRepository implements Repository {

    constructor(private dbCliente: PrismaClient) {
        this.dbCliente = dbCliente;
    }

    async findById(id: number): Promise<UserOut | null> {
        const user = await this.dbCliente.user.findUnique({
            where: { id: id },
        });

        if (!user) {
            return null;
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name!,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt || undefined,
            deletedAt: user.deletedAt || undefined,
        };
    }

    async create(createUser: UserCreateIn): Promise<UserOut | null> {
        
        const { email, password, name } = createUser;
        
        const user = await this.dbCliente.user.create({
            data: {
                email: email,
                password: password,
                name: name,
            },
        });

        if (!user) {    
            return null;
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name!,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt || undefined,
            deletedAt: user.deletedAt || undefined,
        };
        
    }

    async update(updateUser: UserUpdateIn): Promise<UserOut | null> {
        const { id } = updateUser;

        if (updateUser?.password) {
            // TODO: Hash the password before saving it
        }

        const user = await this.dbCliente.user.update({
            where: { id: id },
            data: {
                ...updateUser,
            },
        });

        if (!user) {
            return null;
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name!,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt || undefined,
            deletedAt: user.deletedAt || undefined,
        };
    }

    async delete(deleteUser: UserDeleteIn): Promise<UserOut | null> {
        const { id } = deleteUser;

        const userExists = await this.findById(id);

        if (!userExists) {
            return null;
        }

        const user = await this.dbCliente.user.update({
            where: { id: id },
            data: {
                deletedAt: new Date(),
            },
        });

        if (!user) {
            return null;
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name!,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt || undefined,
            deletedAt: user.deletedAt || undefined,
        };
    }
}