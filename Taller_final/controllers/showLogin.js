const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/login', function (request, response, next) {
    response.render('../views/login.hbs');
});

module.exports = router;