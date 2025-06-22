const shajs = require('sha.js');

export default class CryptoHelper {
    private sha256 = shajs('sha256');
    constructor(
        private secret: string
    ) { }

    passwordEncode(password: string): string {

        const secret = this.secret;

        const combined = password + secret;
        const hash = this.sha256.update(combined).digest('hex')

        return hash;
    }

}