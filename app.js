const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const routes = require('./routes/index')

const app = express()

app.use('/api/auth', routes.auth)

async function start() {
    try {
        await mongoose.connect(config.get('mongoURi'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true

        })
        
    }
    catch(e) {
        console.log('Error', e.message)
        process.exit(1)
    }
}

start()

app.listen(config.get('PORT'), () => {
    console.log(`Сервер запущен на http://localhost:${config.get('PORT')}`)
})