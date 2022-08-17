var express = require('express');
var router = express.Router();

const User = require('../models/user.model');

/* POST user listing. */
router.delete('/user/:id', async (request, response, next) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id);
    response.json({
      message: 'User deleted successfully',
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
