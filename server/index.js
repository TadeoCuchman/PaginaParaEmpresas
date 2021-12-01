const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();

const PORT = process.env.PORT || 5000
const users = require("./api/routes/users")
const contacts = require("./api/routes/contacts")
const clients = require("./api/routes/clients")
const places = require("./api/routes/places")
const workers = require("./api/routes/workers")
const jobs = require("./api/routes/jobs")

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/jobs', jobs)
app.use('/workers', workers)
app.use('/clients', clients)
app.use('/places', places)
app.use('/contacts', contacts)
app.use('/users', users)

app.use('*', (req, res) => {
    res.send('ketapaasaaandaaaaa')
})

app.listen(PORT, (req, res) => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})


module.exports = app