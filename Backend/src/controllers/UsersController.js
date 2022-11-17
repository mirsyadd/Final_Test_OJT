const User = require('../models/UserModel')
const argon2 = require('argon2')

const getUser = async(req, res) => {
    try {
        const response = await User.findAll({
            attributes:['uuid','name','email','role', 'nik', 'phonenumber', 'address', 'projectname']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const getUserbyID = async(req, res) => {
    try {
        const response = await User.findOne({
            attributes:['uuid','name','email','role', 'nik', 'phonenumber', 'address', 'projectname'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const createUser = async(req, res) => {
    const {name, email, password, confPassword, role, nik, phonenumber, address, projectname} = req.body;
    // if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        // console.log(name);
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
            nik: nik,
            phonenumber: phonenumber,
            address: address,
            projectname: projectname
        })
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
        console.log(hashPassword);
    }
}

const updateUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const {name, email, password, confPassword, role, nik, phonenumber, address, projectname} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await User.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
            nik: nik,
            phonenumber: phonenumber,
            address: address,
            projectname: projectname
        },{
            where:{
                id: user.id
            }
        })
        res.status(200).json({msg: "User Update"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

const deleteUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await User.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

module.exports = {
    getUser,
    getUserbyID,
    createUser,
    updateUser,
    deleteUser
}