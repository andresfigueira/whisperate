const CryptoJS = require('crypto-js');

class EncrypterService {
    static encrypt(data, secretKey = process.env.SECRET_KEY_ENCRYPTER) {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    }

    static decrypt(hash, secretKey = process.env.SECRET_KEY_ENCRYPTER) {
        const bytes = CryptoJS.AES.decrypt(hash, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}

module.exports = EncrypterService;
