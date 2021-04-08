const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/BreakingSadDB'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const charRouter = require('./routes/characters')
app.use('/api/v1',charRouter)

const epsRouter = require('./routes/episodes')
app.use('/api/v1',epsRouter)

app.listen(9000, () => {
    console.log('Server started')
})