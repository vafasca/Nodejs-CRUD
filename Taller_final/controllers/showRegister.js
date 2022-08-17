const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/register', function (request, response, next) {
    response.render('../views/register_user.hbs');
});

module.exports = router;