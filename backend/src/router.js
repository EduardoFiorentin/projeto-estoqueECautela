const express = require('express')

const userMiddlewares = require('./middlewares/usersMiddleware')
const permissionMiddleware = require('./middlewares/permissionMiddleware')

const userController = require('./controllers/usersController')
const storageController = require('./controllers/storageController')
const loanController = require('./controllers/loanController')

const router = express.Router()


// login
router.post('/login', userMiddlewares.loginValidate, userController.loginVerify)
router.post('/signin', userMiddlewares.signInValidate, userController.createUser)

//storage 
router.get('/storage',permissionMiddleware.access(1), storageController.getAll)
router.get('/storage/:id',permissionMiddleware.access(1), storageController.getById)
router.post('/storage',permissionMiddleware.access(2), storageController.createItem)
router.put('/storage/:id',permissionMiddleware.access(2), storageController.updateItem)
router.delete('/storage/:id',permissionMiddleware.access(2), storageController.deleteItem)


// loan 
router.get('/loan',
    // permissionMiddleware.access(1),
    loanController.getAll
)

router.get('/loan/:id',
    // permissionMiddleware.access(1), 
    loanController.getById
)

router.post('/loan',
    // permissionMiddleware.access(2), 
    loanController.createItem
)

router.put('/loan/:id',
    // permissionMiddleware.access(2), 
    loanController.updateItem
)
router.delete('/loan/:id',
    // permissionMiddleware.access(2), 
    loanController.deleteItem
)



module.exports = router