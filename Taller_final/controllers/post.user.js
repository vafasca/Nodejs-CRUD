var express = require('express');
var router = express.Router();

const User = require('../models/user.model');

/* POST user listing. */
router.post('/user', async (request, response, next) => {
  try {
    const {userName, userPassword} = request.body;
    const user = new User({userName, userPassword});
    const data = await user.save();
    response.json({
      message: 'User created successfully',
      data
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;
