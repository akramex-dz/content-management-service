const { generateEncryptedApiKey } = require('../utils/security');

const {
  apiKey,
  encryptedApiKey,
  encryptionKey,
  iv,
} = generateEncryptedApiKey();

console.log('API Key:', apiKey);
console.log('Encrypted API Key:', encryptedApiKey);
console.log('Encryption Key:', encryptionKey.toString('hex'));
console.log('Initialization Vector:', iv.toString('hex'));
