const { Router } = require("express");
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {body, validationResult} = require('express-validator')
const router = Router()


router.post(
    '/registr', 
[
    body('checks', 'Нажми мне 18').custom(value => value),
    body('email', 'Говоно мыло').isEmail(),
    body('password', 'Мал пароль').isLength({min:6}),
    body('passwordValid', 'Не совпадают пароли').custom((value, {req}) => {
        if (value != req.body.password) {
           return false 
        }
        return true
    })
],
async (req, res) => {
    try {
        
        console.log(req.body)
        const errors = validationResult(req).array()
        
        if (!validationResult(req).isEmpty()) {
            
            return res.status(400).json({
                errors,
                message:errors[0].msg
            })

        } 

        const {email, password} = req.body
        
        const candidate = await User.findOne({email})
        
        if (candidate) {
            res.status(400).json({message:'Такой уже есть'})
        } 
        const hash_password = await bcrypt.hashSync(password)
        
        user = new User({email, password:hash_password})
        await user.save()

        const token = jwt.sign({
            userId: user.id
        }, config.get('jwtSecret'),
         {expiresIn:'1h'})

        res.json({token, userId:user.id})
    
    } catch (e) {
        console.log(e)
        res.status(500).json({
            errors: e,
            message: 'Ошибка сервера'
        })
        
    }
})

router.post('/login', 
[body('email', 'Не email').normalizeEmail().isEmail(),
body('password', 'Мал пароль').exists()],
 async (req, res) => {
    try {
        const errors = validationResult(req)
        
        if (!errors.isEmpty) {
            return res.status(400).json({
                errors:errors.array(),
                message:'Ошибка'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json('Таких нет')
        }

        const isMatch = await bcrypt.compareSync(password, user.password)

        if (!isMatch) {

            return res.status(400).json('Неверный пароль')
        }

        const token = jwt.sign({
            userId: user.id
        }, config.get('jwtSecret'),
         {expiresIn:'1h'})

        res.json({token, userId:user.id})
        
    } catch (e) {
        return res.status(500).json({
            errors: e,
            message: 'Ошибка'
        })
        
    }
})

module.exports = router