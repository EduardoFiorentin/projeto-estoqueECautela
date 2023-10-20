const connection = require('../models/connection')
const generateUpdateSQLStorage = require('../utils/generateUpdateSQLStorage')

const getAll = async () => {
    const query = 'SELECT * FROM storage'
    const items = await connection.execute(query)
    return items[0]
}

const getById = async (id) => {
    const query = 'SELECT * FROM storage WHERE id = ?'
    const items = await connection.execute(query, [id])
    return items[0]
}

const createItem = async (item) => {
    const query = 'INSERT INTO storage (id, name, description, category, qtd) VALUES (?, ?, ?, ?, ?)'
    const createItem = await connection.execute(query, [item.id, item.name, item.description, item.category, item.qtd])
    return createItem
}

const updateItem = async(id, updateData) => {
    const query = generateUpdateSQLStorage(updateData)
    const modify = await connection.execute(query, [id])
    return modify
}

const deleteItem = async (id) => {
    const query = "DELETE FROM storage WHERE id = ?"
    const item = await connection.execute(query, [id])
    return item
}

module.exports = {
    getAll,
    getById,
    createItem,
    updateItem,
    deleteItem
}