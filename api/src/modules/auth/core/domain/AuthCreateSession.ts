export default interface AuthCreateSession {
    userId: number
    expiresAt: Date
    token:  string
}