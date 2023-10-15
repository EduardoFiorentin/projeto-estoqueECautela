const express = require('express')

const userMiddlewares = require('./middlewares/usersMiddleware')

const userControllers = require('./controllers/usersController')

const router = express.Router()


// login
router.post('/login', userMiddlewares.loginValidate, userControllers.loginVerify)
router.post('/signin', userMiddlewares.signInValidate, userControllers.createUser)



module.exports = router