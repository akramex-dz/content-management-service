const app = require('./app');

const port = process.env.PORT || 5004;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Content Management Service Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
