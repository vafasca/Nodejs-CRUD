const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

/* GET users listing. */
router.get('/user/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);
      response.json({ user });    
  } catch (error) {
    response.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;
