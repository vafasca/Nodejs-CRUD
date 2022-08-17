const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/room/:id', function (request, response, next) {
    response.render('../views/bingo_room.hbs');
});

module.exports = router;