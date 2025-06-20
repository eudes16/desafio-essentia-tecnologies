import type { PrismaClient } from "./../generated/client";

export default abstract class CrudRepository{
    constructor(readonly dbCliente: PrismaClient) {}

    abstract find(data: any): Promise<any>;

    abstract findById(data: any): Promise<any>;

    abstract create(data: any): Promise<any>;

    abstract update(data: any): Promise<any>;

    abstract delete(data: any): Promise<any>;
}