// {
//     "login":"evw",
//     "email":"evw@ev.com",
//     "pass":"evw",
//     "level": "2",
//     "admin": false
// }



// users
const POST_REGISTER = {
    login: {
        type: 'string', 
        max: 25,
        min: 1,
        required: true //necessáriamente possuir um valor válido
    },
    email: {
        type: 'string',
        max: 50,
        min: 10, 
        required: true
    },
    pass: {
        type: 'string',
        max: 25,
        min: 5,
        required: true
    },
    level: {
        type: 'string',
        max: 1,
        min: 1, 
        required: true,
        values: ["1", "2"]
    },
    admin: {
        type: 'boolean',
        required: true,
    }
}

const POST_LOGIN = {
    login: {
        type: 'string',
        max: 25,
        min: 1,
        required: true
    },
    pass: {
        type: 'string',
        max: 25,
        min: 5,
        required: true
    }
}

// console.log(typeof false === 'boolean')
// storage



// loan

// {
//     "name": "Reforçador de solo",
//     "description": "10 unidades",
//     "conditions": "6 novos, 4 usados, 1 com alça quebrada",
//     // "return_date": "",
//     "provider": "Cb Elersson",
//     "receiver": "SD EV De Lima",
//     "status": "1"
// }
const CREATE_LOAN = {
    name: {
        type: 'string',
        max: 50,
        min: 1,
        required: true
    },
    description: {
        type: 'string',
        max: 255,
        min: 0,
        required: false
    },
    conditions: {
        type: 'string',
        max: 50,
        min: 1,
        required: false
    },
    provider: {
        type: 'string',
        max: 50,
        min: 1,
        required: true
    },
    receiver: {
        type: 'string',
        max: 50,
        min: 1,
        required: true
    },
    status: {
        type: 'string',
        max: 1,
        min: 1, 
        required: true,
        values: ["1", "2", "3"]
    }
}

// aceita qualquer objeto que tenha pelo menos um dos campos abaixo
const UPDATE_LOAN = {
    name: {
        type: 'string',
        max: 50,
        min: 1,
        required: false
    },
    description: {
        type: 'string',
        max: 255,
        min: 0,
        required: false
    },
    conditions: {
        type: 'string',
        max: 50,
        min: 1,
        required: false
    },
    provider: {
        type: 'string',
        max: 50,
        min: 1,
        required: false
    },
    receiver: {
        type: 'string',
        max: 50,
        min: 1,
        required: false
    },
    status: {
        type: 'string',
        max: 1,
        min: 1, 
        required: false,
        values: ["1", "2", "3"]
    }
}

module.exports = {
    POST_REGISTER, 
    POST_LOGIN,
    CREATE_LOAN,
    UPDATE_LOAN
}
