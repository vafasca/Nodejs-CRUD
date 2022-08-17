const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

/* GET users listing. */
router.put('/user/:id', async (request, response, next) => {
  try {
    const { userName, userPassword } = request.body;
    const user = await User.findByIdAndUpdate( request.params.id , { userName, userPassword }, {new: true} );
    response.json({
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;
