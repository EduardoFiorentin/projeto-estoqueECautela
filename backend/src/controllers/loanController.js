const loanModel = require('../models/loanModel')
const generateRandomId = require('../utils/generateRandomId')

const LOAN_STATUS = {
    "1": "Não Retirado", 
    "2": "Cautelado", 
    "3": "Descautelado", 
}

const getAll = async (req, res) => {
    try {
        let items = await loanModel.getAll()
        if (items) {
            items.map(item => item.statusId = item.status)
            items.map(item => item.status = LOAN_STATUS[item.status])
            return res.status(200).json({message: ["Requisição bem sucedida!"], status: 200, items})
        }
        else {
            return res.status(400).json({message: ["Ocorreu um erro em nosso servidor! Tente novamente mais tarde!"], status: 500})
        }
    } catch (err) {
        return res.status(400).json({message: ["Ocorreu um erro em nosso servidor! Tente novamente mais tarde!"], status: 500})
    }
    
}

const getById = async (req, res) => {
    try {
        const item = await loanModel.getById(req.params.id)
        if (item) res.status(200).json({message: ["Requisição bem sucedida!"], status: 200, item})
        else res.status(500).json({message: ["Ocorreu um erro em nosso servidor! Tente novamente mais tarde!"], status: 500})
    } catch (err) {
        return res.status(400).json({message: ["Ocorreu um erro em nosso servidor! Tente novamente mais tarde!"], status: 500})
    }
}

const createItem = async (req, res) => {
    let newItem = req.body

    newItem.id = generateRandomId()

    try {
        await loanModel.createItem(newItem)
        const item = await loanModel.getById(newItem.id)
        return res.status(201).json({message: ["Novo item criado com sucesso!"], status: 201,  item})

    } catch(err) {
        return res.status(400).json({message: ["Ocorreu um erro em nosso servidor! Tente novamente mais tarde!"], status: 500})
    }
    
}

const updateItem = async(req, res) => {
    const id = req.params.id
    const updateData = req.body

    try {
        const updateItem = await loanModel.updateItem(id, updateData)
        if (updateItem[0].affectedRows == 1) return res.status(200).json({message: ["Item modificado com sucesso!"], status: 200})
        
        else {
            const item = await loanModel.getById(id)
            if (item.length == 0) return res.status(404).json({message: ["Id fornecido não existe!"], status: 404})
            else return res.status(500).json({message: ["Ocorreu um erro em nosso servidor! Tente novamente mais tarde!"], status: 500})
        }
    } catch(err) {
        return res.status(400).json({message: ["Ocorreu um erro em nosso servidor! Tente novamente mais tarde!"], status: 500})
    }
}

const deleteItem = async (req, res) => {
    const id = req.params.id

    try {
        const item = await loanModel.getById(id)
    
        if (item.length == 0) return res.status(404).json({message: ["Id fornecido não existe!"], status: 404})
    
        const deleteItem = await loanModel.deleteItem(id)
    
        if (deleteItem) return res.status(200).json({message: ["Item deletado com sucesso!"], status: 200})
        else return res.status(500).json({message: ["Ocorreu um erro em nosso servidor! Tente novamente mais tarde!"], status: 500})
    } catch (err) {
        return res.status(400).json({message: ["Ocorreu um erro em nosso servidor! Tente novamente mais tarde!"], status: 500})
    }

}

module.exports = {
    getAll,
    getById,
    updateItem,
    createItem,
    deleteItem
}