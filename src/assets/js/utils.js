let scrypt = require('scrypt-js');
let cryp = require('crypto-browserify');
let _ = require('lodash');
let utils = require('web3-utils');
export default {
    encryptContent(data, password) {
        let optionsCipher = 'aes-128-ctr'
        let salt = cryp.randomBytes(32);
        let iv = cryp.randomBytes(16);
        let derivedKey;
        let kdfparams = {
            dklen: 32,
            salt: salt.toString('hex'),
            n: 8192, // 2048 4096 8192 16384
            r: 8,
            p: 1
        };
        derivedKey = scrypt.syncScrypt(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);

        let cipher = cryp.createCipheriv(optionsCipher, derivedKey.slice(0, 16), iv);
        if (!cipher) {
            throw 'Unsupported cipher'
        }

        let ciphertext = cipher.update(data, 'utf-8', 'hex');

        ciphertext += cipher.final();

        let mac = utils.sha3(Buffer.from([...derivedKey.slice(16, 32), ciphertext])).replace('0x', '');
        return {
            ciphertext: ciphertext,
            iv: iv.toString('hex'),
            salt: salt.toString('hex'),
            mac: mac.toString('hex')
        };
    },
    decryptContent(v3Keystore, password) {
        if (!_.isString(password)) {
            throw 'No password given.'
        }
        let json = (_.isObject(v3Keystore)) ? v3Keystore : JSON.parse(v3Keystore);

        let optionsCipher = 'aes-128-ctr'
        let salt = json.salt;
        let derivedKey;
        let kdfparams = {
            dklen: 32,
            salt: salt.toString('hex'),
            n: 8192,
            r: 8,
            p: 1
        };
        derivedKey = scrypt.syncScrypt(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
        let ciphertext = Buffer.from(json.ciphertext, 'hex');
        let mac = utils.sha3(Buffer.from([...derivedKey.slice(16, 32), ciphertext])).replace('0x', '');
        if (mac !== json.mac) {
            throw 'Key derivation failed - possibly wrong password'
        }
        let decipher = cryp.createDecipheriv(optionsCipher, derivedKey.slice(0, 16), Buffer.from(json.iv, 'hex'));
        let decrypted = decipher.update(json.ciphertext, 'hex', 'utf-8');

        decrypted += decipher.final('utf-8');
        return decrypted;
    }

}