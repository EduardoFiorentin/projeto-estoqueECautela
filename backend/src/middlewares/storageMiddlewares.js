const schemas = require('../schemas/requestSchemas')
const validate = require('./validate')
const validateNameFields = require('./validateNameFields')

const createMiddleware = (req, res, next) => {
    const errors = validate(req.body, schemas.CREATE_STORAGE)
    if (errors.length != 0) return res.status(400).json({status: 400, message: errors})
    next()
}

const updateMiddleware = (req, res, next) => {
    if (Object.keys(req.body).length == 0) res.status(400).json({status: 400, message: "Nenhum campo foi modificado!"})
    
    const validUpdateFields = ["name", "description", "category", "qtd"]
    const noValidFields = validateNameFields(req.body, validUpdateFields)

    if (noValidFields.length != 0) return res.status(400).json({status: 400, message: noValidFields})

    const errors = validate(req.body, schemas.UPDATE_STORAGE)
    if (errors.length != 0) return res.status(400).json({status: 400, message: errors})
    next()
}

module.exports = {
    createMiddleware,
    updateMiddleware
}