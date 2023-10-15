const usersModel = require('../models/usersModel')
const generateRandomId = require('../utils/generateRandomId')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config() 

const loginVerify = async (req, res) => {
    const user = req.body
    const logUser = await usersModel.loginUser(user)
    console.log("aqui otario", logUser)
    // console.log(logUser)
    if (logUser.length === 0) res.status(400).json({message: "User doesn't exists!", status:400})

    console.log('user pass:', user.pass)
    console.log('logUseruser pass:', logUser[0].pass)
    const checkPass = await bcrypt.compare(user.pass, logUser[0].pass)
    console.log(checkPass)

    if (checkPass) {
        const secret = process.env.SECRET
        const token = jwt.sign({id: logUser.id, level: logUser.level, admin: logUser.admin}, secret)
        return res.status(200).json({message: "LogIn successful!", status:200, token: token})
    } 
    else return res.status(400).json({message: "Incorrect password!", status:400})

}

const createUser = async(req, res) => {
    let newUser = req.body
    newUser.id = generateRandomId()
    console.log('nu: ', newUser)

    // criptografia senha 
    const salt = await bcrypt.genSalt(12)
    const passHash = await bcrypt.hash(newUser.pass, salt)

    newUser.pass = passHash

    const createdUser = await usersModel.createUser(newUser)
    return res.status(200).json({message: "User created", status: 200})
}

module.exports = {
    loginVerify,
    createUser
}