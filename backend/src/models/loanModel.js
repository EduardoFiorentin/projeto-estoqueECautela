const connection = require('../models/connection')
const generateUpdateSQLLoan = require('../utils/generateUpdateSQLLoan')


const getAll = async () => {
    const query = 'SELECT * FROM loan'
    const items = await connection.execute(query)
    return items[0]
}

const getById = async (id) => {
    const query = 'SELECT * FROM loan WHERE id = ?'
    const items = await connection.execute(query, [id])
    return items[0]
}

const createItem = async (item) => {
    const query = "INSERT INTO loan (id, name, description, conditions, return_date, provider, receiver, status)  VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
    const createItem = await connection.execute(query, [item.id, item.name, item.description, item.conditions, item.return_date ? item.return_date : null, item.provider, item.receiver, item.status])
    return createItem
}


const updateItem = async(id, updateData) => {
    const query = generateUpdateSQLLoan(updateData)
    console.log(query)
    const modify = await connection.execute(query, [id])
    return modify
}

const deleteItem = async (id) => {
    const query = "DELETE FROM loan WHERE id = ?"
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