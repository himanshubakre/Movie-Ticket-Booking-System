const CryptoJS = require('crypto-js');

// Encryption function
const encryptPaymentDetails = (details, secretKey) => {
  return CryptoJS.AES.encrypt(JSON.stringify(details), secretKey).toString();
};

// Decryption function
const decryptPaymentDetails = (encryptedData, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

module.exports = {
  encryptPaymentDetails,
  decryptPaymentDetails,
};
