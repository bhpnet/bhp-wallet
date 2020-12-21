// import Vue from 'vue'
import CryptoJS from 'crypto-js'
export default {
    // 加密
    encrypt(word, keyStr, ivStr) {
        // keyStr 需要为16位字符串,不然解密内容为空
        let key = CryptoJS.enc.Utf8.parse(keyStr);
        let iv = CryptoJS.enc.Utf8.parse(ivStr);
        let srcs = CryptoJS.enc.Utf8.parse(word);

        let encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        return encrypted.toString();
    },
    // 解密
    decrypt(word, keyStr, ivStr) {
      
        var key = CryptoJS.enc.Utf8.parse(keyStr);
        let iv = CryptoJS.enc.Utf8.parse(ivStr);

        var decrypt = CryptoJS.AES.decrypt(word, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        return decrypt.toString(CryptoJS.enc.Utf8);
    },
    // 加密
    encryptECB(word, keyStr) {
        // keyStr 需要为16位字符串,不然解密内容为空

        let key = CryptoJS.enc.Utf8.parse(keyStr);
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    },
  
};