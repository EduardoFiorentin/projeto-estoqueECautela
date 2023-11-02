// const schemas = require('./requestSchemas')

const mockLogin = {
    login: "aklsdhlfas",
    pass: 'aaaaa',
    email: "sdfgdassdafasd",
    level: "2",
    admin: true
}

const validate = (data, schema) => {
    errors = []

    console.log('data: ', data)
    console.log('schema: ', schema)

    // data[key] - valor passado no body
    // schema[key] - regras para esse valor 

    Object.keys(schema).forEach(key => {
        
        // required
        // console.log(key, Object.hasOwn(data, key))
        if (schema[key].required && !Object.hasOwn(data, key)) errors.push(`${key} field is required!`)
        else if (Object.hasOwn(data, key)){
    
            // type
            if (typeof data[key] != schema[key].type) errors.push(`${key} field must be of type '${schema[key].type}', not '${typeof data[key]}'`)
            
            // min and max
            if (typeof schema[key].type == 'string' && typeof data[key] == 'string') {
                if (!!schema[key].max && data[key].length > schema[key].max) errors.push(`${key} field must have a maximum ${schema[key].max} characters!`)
                if (!!schema[key].min && data[key].length < schema[key].min) errors.push(`${key} field must have at least ${schema[key].min} characters!`)
            }

            // values
            if (!!schema[key].values) {
                if (!schema[key].values.includes(data[key])) errors.push(`${key} field must have one of the following values: ${schema[key].values.join(" ; ")}`)
            }
        }


        
    })

    console.log("validate.js: Erros: ", errors)
    return errors

} 

module.exports = validate

// validate(mockLogin, schemas.POST_REGISTER)