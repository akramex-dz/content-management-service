const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'This the simple feed content management service API.',
  });
});

module.exports = router;
