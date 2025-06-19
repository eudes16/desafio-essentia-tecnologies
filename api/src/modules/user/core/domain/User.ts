export default interface User {
    id: number;
    email: string;
    name: string;
    password: string; // Optional, as it may not be needed in all contexts
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}