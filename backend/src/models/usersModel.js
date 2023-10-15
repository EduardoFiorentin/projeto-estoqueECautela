const connection = require('./connection')

// permissão: 2
const createUser = async (user) => {
    console.log(user)
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

//permissão: 2
// const updateUser = async (modifyJson) => {
//     console.log(modifyJson)
//     let query = "UPDATE users SET "
//     for (const index in modifyJson) {
//         query += `${modifyJson[index].field} = "${modifyJson[index].value}", `
//         // console.log(element)
//     }
//     query += " WHERE id=?;"
//     // const updatedUser = connection.execute(query, [user.id, user.login, user.email, user.pass, user.pass, user.level, user.admin])
//     // return updatedUser
//     console.log(query)
// }

// const modifyJson = [
//     {field: "name", value: "novo nome"},
//     {field: "login", value: "novo log"},
//     {field: "email", value: "novo email"},
//     {field: "pass", value: "novo pass"},
//     {field: "level", value: "2"},
//     {field: "admin", value: false}
// ]

// updateUser(modifyJson)



// permissão: todos
const loginUser = async(user) => {
    console.log("user ", user)
    const query = 'SELECT * FROM users WHERE login=?;'
    const findUser = await connection.execute(query, [user.login])
    console.log('model: ', findUser[0])
    return findUser[0]
}

module.exports = {
    createUser,
    deleteUser,
    loginUser
}
