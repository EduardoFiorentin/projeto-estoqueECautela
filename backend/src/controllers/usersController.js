const usersModel = require('../models/usersModel')
const generateRandomId = require('../utils/generateRandomId')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config() 

const loginVerify = async (req, res) => {
    try {
        const user = req.body
        const logUser = await usersModel.loginUser(user)
    
        if (logUser.length === 0) return res.status(400).json({message: ["Usuario não existe!"], status:400})
    
        const checkPass = await bcrypt.compare(user.pass, logUser[0].pass)
    
        if (checkPass) {
            const secret = process.env.SECRET
            const data = {"id": logUser[0].id, "level": logUser[0].level, "admin": logUser[0].admin}
            const token = jwt.sign(data, secret)
            const userInfo = {
                "user": logUser[0].login,
                "level": logUser[0].level,
                "admin": logUser[0].admin
            }
            return res.status(200).json({message: ["LogIn efetuado com sucesso!"], status:200, token: token, userInfo})
        } 
        else return res.status(400).json({message: ["Senha incorreta!"], status:400})
    } catch (err) {
        return res.status(400).json({message: ["Ocorreu um erro em nosso servidor! Tente novamente mais tarde!"], status: 500})
    }
}

const createUser = async(req, res) => {
    try {
        let newUser = req.body
        newUser.id = generateRandomId()
    
        const salt = await bcrypt.genSalt(12)
        const passHash = await bcrypt.hash(newUser.pass, salt)
    
        newUser.pass = passHash
    
        await usersModel.createUser(newUser)
        return res.status(200).json({message: ["Usuário criado com sucesso!"], status: 200})
        
    } catch (err) {
        return res.status(400).json({message: ["Ocorreu um erro em nosso servidor! Tente novamente mais tarde!"], status: 500})
    }
}

module.exports = {
    loginVerify,
    createUser
}
