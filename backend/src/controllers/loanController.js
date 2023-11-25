const loanModel = require('../models/loanModel')
const generateRandomId = require('../utils/generateRandomId')

const LOAN_STATUS = {
    "1": "Não Retirado", 
    "2": "Cautelado", 
    "3": "Descautelado", 
}

const getAll = async (req, res) => {
    let items = await loanModel.getAll()
    if (items) {
        items.map(item => item.status = LOAN_STATUS[item.status])
        res.status(200).json({message: ["Request successfull!"], status: 200, items})
    }
    else res.status(500).json({message: ["Server error!"], status: 500})
}

const getById = async (req, res) => {
    const item = await loanModel.getById(req.params.id)
    if (item) res.status(200).json({message: ["Request successfull!"], status: 200, item})
    else res.status(500).json({message: ["Server error!"], status: 500})
}

const createItem = async (req, res) => {
    let newItem = req.body

    newItem.id = generateRandomId()

    await loanModel.createItem(newItem)
    const item = await loanModel.getById(newItem.id)
    return res.status(201).json({message: ["New item created!"], status: 201,  item})
}

const updateItem = async(req, res) => {
    const id = req.params.id
    const updateData = req.body

    const updateItem = await loanModel.updateItem(id, updateData)
    if (updateItem[0].affectedRows == 1) return res.status(200).json({message: ["Item successfully modified!"], status: 200})
    
    else {
        const item = await loanModel.getById(id)
        if (item.length == 0) return res.status(404).json({message: ["Id does not exists!"], status: 404})
        else return res.status(500).json({message: ["Server Error!"], status: 500})
    }
}

const deleteItem = async (req, res) => {
    const id = req.params.id

    const item = await loanModel.getById(id)

    if (item.length == 0) return res.status(404).json({message: ["Id does not exists!"], status: 404})

    const deleteItem = await loanModel.deleteItem(id)

    if (deleteItem) return res.status(200).json({message: ["Item deleted successfully."], status: 200})
    else return res.status(500).json({message: ["Server error!"], status: 500})
}

module.exports = {
    getAll,
    getById,
    updateItem,
    createItem,
    deleteItem
}