// import CryptoJS from 'crypto-js'
const CryptoJS = require("crypto-js")

const secretKey = 'YourSecretKey';

/**
 * 
 ** This function encrypts the login data which is sent to the server
 ** where it will be decrypted
 */

function encryptAuthFunc(action, data){
    if (action === 'encrypt') {
      const plaintext = `${data.username}:${data.password}`;
      const ciphertext = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
      console.log(ciphertext)
      return ciphertext;
    } else if (action === 'decrypt') {
      try {
        const bytes = CryptoJS.AES.decrypt(data, secretKey);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        const [username, password] = decryptedText.split(':');
        return { username, password };
      } catch (error) {
        console.error('Error decrypting credentials:', error.message);
        return null;
      }
    } else {
      console.error('Invalid action. Use "encrypt" or "decrypt".');
      return null;
    }
  };

  //^ Encrypts the Login Details
  const encryptedCredentials = encryptAuthFunc('encrypt', { username: "Test", password: "pzz4545" });
  console.log('Encrypted Credentials:', encryptedCredentials);

  //^ Decrypt
  const decryptedCredentials = encryptAuthFunc('decrypt', encryptedCredentials);
  console.log('Decrypted Credentials:', decryptedCredentials);