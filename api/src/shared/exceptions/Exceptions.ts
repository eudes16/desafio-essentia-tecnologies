
export class Exceptions extends Error {
    constructor(message: string, public code?: number) {
        super(message);
    }
}
