const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully'); // delete before going to production
  } catch (error) {
    console.log(error); // delete before going to production
    throw new Error('Failed to connect to database');
  }
};

module.exports = connect;
