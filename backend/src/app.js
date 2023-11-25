const express = require('express')
const router = require('./router')
var cors = require('cors');
// var fs = require('fs');

const app = express()

app.use(cors())

app.use(express.json())
app.use(router)



module.exports = app