export type CreateToken = (payload: string, secret: string, expiresIn: string) => Promise<string>

export type ValidateToken = (token: string, secret: string) => Promise<any>