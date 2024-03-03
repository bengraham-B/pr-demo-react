const CryptoJS = require("crypto-js")

export default function encryptAuthFunc(data){
    const plaintext = `${data.username}:${data.password}`;
    const ciphertext = CryptoJS.AES.encrypt(plaintext, process.env.REACT_APP_SECRET_AUTH_KEY).toString();
    console.log(ciphertext)
    return ciphertext;
};