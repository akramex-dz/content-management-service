const crypto = require('crypto');

function generateEncryptedApiKey() {
  // Generate a random API key
  const apiKey = crypto.randomBytes(32).toString('hex');

  // Define an encryption key and an initialization vector
  const encryptionKey = crypto.randomBytes(32); // Must be 256 bits (32 bytes)
  const iv = crypto.randomBytes(16); // Must be 128 bits (16 bytes)

  // Create a cipher using AES-256-CBC encryption
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);

  // Encrypt the API key
  let encrypted = cipher.update(apiKey, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const encryptedApiKey = encrypted;

  return {
    apiKey,
    encryptedApiKey,
    encryptionKey,
    iv,
  };
}

module.exports = {
  generateEncryptedApiKey,
};
