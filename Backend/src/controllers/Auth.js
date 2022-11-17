const User = require('../models/UserModel')
const argon2 = require('argon2')

const Login = async (req, res) =>{
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    const nik = user.nik;
    const phonenumber = user.phonenumber;
    const address = user.address;
    const projectname = user.projectname;
    res.status(200).json({uuid, name, email, role, nik, phonenumber, address, projectname});
}

const logOut = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}

const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne({
        attributes: ['uuid','name','email','role', 'nik', 'phonenumber', 'address', 'projectname'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

module.exports = {
    Login,
    logOut,
    Me
}