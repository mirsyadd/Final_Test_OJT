const express = require('express');
const { getUser, getUserbyID, createUser, updateUser, deleteUser } = require('../controllers/UsersController');
const { verifyUser, hrOnly } = require('../middleware/AuthUser');

const router = express.Router();

router.get('/users', verifyUser , hrOnly ,  getUser)
router.get('/users/:id', verifyUser ,getUserbyID)
router.post('/users',createUser)
router.put('/users/:id', verifyUser ,updateUser)
router.delete('/users/:id', verifyUser ,deleteUser)

module.exports = router