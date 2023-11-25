const usersModel = require('../models/usersModel')
const generateRandomId = require('../utils/generateRandomId')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config() 

const loginVerify = async (req, res) => {
    const user = req.body
    const logUser = await usersModel.loginUser(user)

    if (logUser.length === 0) return res.status(400).json({message: ["User doesn't exists!"], status:400})

    // console.log("log user: ", logUser)
    const checkPass = await bcrypt.compare(user.pass, logUser[0].pass)

    if (checkPass) {
        const secret = process.env.SECRET
        const data = {"id": logUser[0].id, "level": logUser[0].level, "admin": logUser[0].admin}
        const token = jwt.sign(data, secret)
        return res.status(200).json({message: ["LogIn successful!"], status:200, token: token})
    } 
    else return res.status(400).json({message: ["Incorrect password!"], status:400})

}

const createUser = async(req, res) => {
    let newUser = req.body
    newUser.id = generateRandomId()

    const salt = await bcrypt.genSalt(12)
    const passHash = await bcrypt.hash(newUser.pass, salt)

    newUser.pass = passHash

    await usersModel.createUser(newUser)
    return res.status(200).json({message: ["User created"], status: 200})
}

module.exports = {
    loginVerify,
    createUser
}
