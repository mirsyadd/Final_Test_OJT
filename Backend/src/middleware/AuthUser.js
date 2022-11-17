const User = require('../models/UserModel')

const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    req.userId = user.id;
    req.role = user.role;
    req.projectname = user.projectname;
    next();
}

const hrOnly = async (req, res, next) =>{
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if(user.role !== "HR") return res.status(403).json({msg: "Akses terlarang"});
    next();
}

const PMOnly = async (req, res, next ) => {
    const user = await User.findOne({
        where: {
            projectname: req.session.projectname
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if(user.role !== "PM") return res.status(403).json({msg: "Akses terlarang"});
    next();
}

module.exports = {verifyUser, hrOnly, PMOnly}