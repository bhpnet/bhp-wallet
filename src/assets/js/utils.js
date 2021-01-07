
let scrypt = require('scrypt-js');
let cryp = require('crypto-browserify');
let _ = require('lodash');
let utils = require('web3-utils');
export default {
    encryptContent(data, password) {
        //加密算法
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
        //生成密码算法
        derivedKey = scrypt.syncScrypt(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);

        // 如下方法使用指定的算法与密码来创建cipher对象
        let cipher = cryp.createCipheriv(optionsCipher, derivedKey.slice(0, 16), iv);
        if (!cipher) {
            throw 'Unsupported cipher'
        }

        // 使用该对象的update方法来指定需要被加密的数据
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
    // 创建解密算法
    decryptContent(v3Keystore, password) {
        if (!_.isString(password)) {
            throw 'No password given.'
        }
        //转换data为json格式
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
        /*
             该方法使用指定的算法与密码来创建 decipher对象, 第一个算法必须与加密数据时所使用的算法保持一致;
             第二个参数用于指定解密时所使用的密码，该密码是scrypt使用用户密码和随机salt生成
             第三个参数为iv：初始计数器
        */
        let ciphertext = Buffer.from(json.ciphertext, 'hex');
        let mac = utils.sha3(Buffer.from([...derivedKey.slice(16, 32), ciphertext])).replace('0x', '');
        if (mac !== json.mac) {
            throw 'Key derivation failed - possibly wrong password'
        }
        let decipher = cryp.createDecipheriv(optionsCipher, derivedKey.slice(0, 16), Buffer.from(json.iv, 'hex'));
        /*
         第一个参数为密文：一个Buffer对象或一个字符串，用于指定需要被解密的数据
         第二个参数用于指定被解密数据所使用的编码格式，可指定的参数值为 'hex', 'binary', 'base64'等，
         第三个参数用于指定输出解密数据时使用的编码格式，可选参数值为 'utf-8', 'ascii' 或 'binary';
        */
        let decrypted = decipher.update(json.ciphertext, 'hex', 'utf-8');

        decrypted += decipher.final('utf-8');
        return decrypted;
    }

}