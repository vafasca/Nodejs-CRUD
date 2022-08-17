var express = require('express');
var router = express.Router();

const User = require('../models/user.model');

/* GET users listing. */
router.get('/users', async (request, response, next) => {
  try {
    const data = await User.find({});
    response.json({ data });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;
