const CryptoJS = require('crypto-js');

class EncrypterService {
    static encrypt(data, secretKey = process.env.ENCRYPTER_RECIPE) {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    }

    static decrypt(hash, secretKey = process.env.ENCRYPTER_RECIPE) {
        const bytes = CryptoJS.AES.decrypt(hash, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}

module.exports = EncrypterService;
