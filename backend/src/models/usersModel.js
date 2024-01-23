const connection = require('./connection')

// permissão: 2
const createUser = async (user) => {
    const query = 'INSERT INTO users (id, login, email, pass, level, admin) VALUES (?, ?, ?, ?, ?, ?)'
    const createdUser = connection.execute(query, [user.id, user.login, user.email, user.pass, user.level, user.admin])
    return createdUser
}

// permissão: 2 e admin=true
const deleteUser = async (user) => {
    const query = 'INSERT INTO users (id, login, email, pass, level, admin) VALUES (?, ?, ?, ?, ?, ?)'
    const createdUser = connection.execute(query, [user.id, user.login, user.email, user.pass, user.pass, user.level, user.admin])
    return createdUser
}

// permissão: todos
const loginUser = async(user) => {
    const query = 'SELECT * FROM users WHERE login=?;'
    const findUser = await connection.execute(query, [user.login])
    return findUser[0]
}

module.exports = {
    createUser,
    deleteUser,
    loginUser
}
