const storageModel = require('../models/storageModel')
const generateRandomId = require('../utils/generateRandomId')

const getAll = async (req, res) => {
    const items = await storageModel.getAll()
    if (items) res.status(200).json({message: "Request successfull!", status: 200, items})
    else res.status(500).json({message: "Server error!", status: 500})
}

const getById = async (req, res) => {
    const item = await storageModel.getById(req.params.id)
    if (item) res.status(200).json({message: "Request successfull!", status: 200, item})
    else res.status(500).json({message: "Server error!", status: 500})
}

const createItem = async (req, res) => {
    let newItem = req.body

    newItem.id = generateRandomId()

    await storageModel.createItem(newItem)
    const item = await storageModel.getById(newItem.id)
    return res.status(201).json({message: "New item created!", status: 201,  item})
}

const updateItem = async(req, res) => {
    const id = req.params.id
    const updateData = req.body

    const updateItem = await storageModel.updateItem(id, updateData)
    if (updateItem[0].affectedRows == 1) return res.status(200).json({message: "Item successfully modified!", status: 200})
    
    else {
        const item = await storageModel.getById(id)
        if (item.length == 0) return res.status(404).json({message: "Id does not exists!", status: 404})
        else return res.status(500).json({message: "Server Error!", status: 500})
    }
}

const deleteItem = async (req, res) => {
    const id = req.params.id

    const item = await storageModel.getById(id)
    // console.log(item, item.length)
    if (item.length == 0) return res.status(404).json({message: "Id does not exists!", status: 404})

    const deleteItem = await storageModel.deleteItem(id)
    // // console.log("items:", items)
    if (deleteItem) return res.status(200).json({message: "Item deleted successfully.", status: 200})
    else return res.status(500).json({message: "Server error!", status: 500})
}

module.exports = {
    getAll,
    getById,
    updateItem,
    createItem,
    deleteItem
}