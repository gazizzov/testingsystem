const app = require('express')
const path = require('path')

const PORT = 8080

const app = express()
app.use(express.static(__dirname))
app.use(express.static(path))