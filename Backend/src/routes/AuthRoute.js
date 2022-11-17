const express = require('express');
const router = express.Router();

const {Login, logOut, Me} = require('../controllers/Auth')

router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', logOut);

module.exports = router;