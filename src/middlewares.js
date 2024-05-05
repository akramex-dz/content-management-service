const crypto = require('crypto');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

// Middleware for API key authentication
const apiKeyAuth = (req, res, next) => {
  const encryptedApiKey = req.headers['x-api-key'];

  if (!encryptedApiKey) {
    return res.status(401).json({ error: 'No API key provided' });
  }

  // Define the same encryption key and IV that you used to encrypt the key
  const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  const iv = Buffer.from(process.env.IV, 'hex');

  // Create a decipher
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);

  // Decrypt the API key
  let decrypted = decipher.update(encryptedApiKey, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  if (decrypted !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  next();
};

module.exports = {
  notFound,
  errorHandler,
  apiKeyAuth,
};
