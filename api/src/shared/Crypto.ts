import crypto from 'crypto'

export default function (password: string, secret: string) {
    const combined = password + secret;
    const hash = crypto.createHash('sha256').update(combined).digest('hex');
    return hash;
}
