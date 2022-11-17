const express = require('express');
const { getTicket, getTicketbyID, createTicket, updateTicket, deleteTicket } = require('../controllers/TicketController');
const { verifyUser } = require('../middleware/AuthUser');

const router = express.Router();

router.get('/tickets', verifyUser ,getTicket)
router.get('/tickets/:id', verifyUser ,getTicketbyID)
router.post('/tickets', verifyUser ,createTicket)
router.put('/tickets/:id', verifyUser ,updateTicket)
router.delete('/tickets/:id', verifyUser ,deleteTicket)

module.exports = router