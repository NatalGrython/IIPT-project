const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const routes = require('./routes/index')

const app = express()

app.use(express.json({extended: true}))

mongoose.connect(config.get('mongoURi'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
            .then(e => console.log('Подключение к бд установлено'))
            .catch(e => {
                console.log('Error= ', e.message)
            })

        



app.use('/api/auth', routes.auth)

app.listen(config.get('PORT'), () => {
    console.log(`Сервер запущен на http://localhost:${config.get('PORT')}`)
})