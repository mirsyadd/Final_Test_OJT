const express = require('express');
const produceController = require('../Controllers/RabbitMQController');
const router = express.Router();

router.get('/produce', produceController)

module.exports = router;