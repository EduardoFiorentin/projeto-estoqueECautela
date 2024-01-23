const validateNameFields = (obj, names) => {
    const objNames = Object.keys(obj)
    let invalidFields = []
    objNames.filter(name => {
        if (!names.includes(name)) invalidFields.push(`Campo '${name}' não é válido!`)
    })
    return invalidFields
}

module.exports = validateNameFields