const schemas = require('../schemas/requestSchemas')
const validate = require('./validate')

const loginValidate = (req, res, next) => {
    const errors = validate(req.body, schemas.POST_LOGIN)
    if (errors.length != 0) return res.status(400).json({status: 400, message: errors})
    next()
}

const signInValidate = (req, res, next) => {
    const errors = validate(req.body, schemas.POST_REGISTER)
    if (errors.length != 0) return res.status(400).json({status: 400, message: errors})
    next()
}

module.exports = {
    loginValidate,
    signInValidate
}