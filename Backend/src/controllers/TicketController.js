const Tickets = require('../models/TicketModel')
const User = require('../models/UserModel')
const {Op} = require('sequelize')

const getTicket = async (req, res) => {
    try {
        let response;
        if(req.role === "HR"){
            response = await Tickets.findAll({
                include:[{
                    model: User
                }]
            });
        }else{
            response = await Tickets.findAll({
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const getTicketbyID = async (req, res) => {
    try {
        const ticket = await Tickets.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!ticket) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "HR"){
            response = await Tickets.findOne({
                where:{
                    id: ticket.id
                },
                include:[{
                    model: User
                }]
            });
        }else{
            response = await Tickets.findOne({
                where:{
                    [Op.and]:[{id: ticket.id}, {userId: req.userId}]
                },
                include:[{
                    model: User
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const createTicket = async(req, res) => {
    const {tickettype, currentapprovalname, currentapprovalrole, status, description, totalclaim} = req.body;
    try {
        await Tickets.create({
            tickettype: tickettype,
            currentapprovalname: currentapprovalname,
            currentapprovalrole: currentapprovalrole,
            status: status,
            description:description,
            totalclaim: totalclaim,
            userId: req.userId
        });
        console.log(tickettype);
        res.status(201).json({msg: "Ticket Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const updateTicket = async(req, res) => {
    try {
        const ticket = await Tickets.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!ticket) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {tickettype, currentapprovalname, currentapprovalrole, status} = req.body;

        if(req.role === "HR"){
            await Tickets.update({tickettype, currentapprovalname, currentapprovalrole, status},{
                where:{
                    id: ticket.id
                }
            })
        }else{
            if(req.userId !== ticket.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Tickets.update({tickettype, currentapprovalname, currentapprovalrole, status},{
                where:{
                    [Op.and]:[{id: ticket.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Product updated successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const deleteTicket = async(req, res) => {
    try {
        const ticket = await Tickets.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!ticket) return res.status(404).json({msg: "Data tidak ditemukan"});
        if(req.role === "HR"){
            await Tickets.destroy({
                where:{
                    id: ticket.id
                }
            });
        }else{
            if(req.userId !== ticket.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Tickets.destroy({
                where:{
                    [Op.and]:[{id: ticket.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Ticket deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const summaryTicket = (req, res) => {
    
}

module.exports = {
    getTicket,
    getTicketbyID,
    createTicket,
    updateTicket,
    deleteTicket
}