const validateNameFields = (obj, names) => {
    const objNames = Object.keys(obj)
    let invalidFields = []
    objNames.filter(name => {
        if (!names.includes(name)) invalidFields.push(`Campo '${name}' não é válido!`)
    })
    return invalidFields
}

// const obj = {
//     "abc":"fiore",
//     "email":"fiore@assalto.com",
//     "pass":"fiore",
//     "level": "2",
//     "admin": false
// }

// const names = ["login", "email", "pass", "level", "admin"]

// console.log(validateNameFields(obj, names))

module.exports = validateNameFields