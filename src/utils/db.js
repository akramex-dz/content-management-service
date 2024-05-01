const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.DATABASE_URL);
client.connect();

module.exports = {
  client,
};
