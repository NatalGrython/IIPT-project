const { Router } = require("express");
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const router = Router()


router.post('/registr', 
[check('email', 'Говоно мыло').isEmail,
check('password', 'Мал пароль').isLength({min:6})],
 async (req, res) => {
    try {
        const errors = validationResult(req)
        
        if (!errors.isEmpty) {
            return res.status(400).json({
                errors:errors.array(),
                message:'Ошибка епта'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({message:'Такой уже есть'})
        } 

        const hash_password = await bcrypt.hash(password)
        const user = new User({email, password:hash_password})
        await user.save()
        return res.status(201).json({message:'Зарегали'})
        
    } catch (e) {
        res.status(500).json({
            message: 'Ошибка бля'
        })
        
    }
})

router.post('/registr', 
[check('email', 'Говоно мыло').normalizeEmail().isEmail(),
check('password', 'Мал пароль').exists()],
 async (req, res) => {
    try {
        const errors = validationResult(req)
        
        if (!errors.isEmpty) {
            return res.status(400).json({
                errors:errors.array(),
                message:'Ошибка епта'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json('Таких нет')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {

            return res.status(400).json('Неверный пароль')
        } 

        const token = jwt.sign({
            userId: user.id
        }, config.get('jwstSecret'),
         {expiresIn:'1h'})

        res.json({token, userId:user.id})
        
    } catch (e) {
        res.status(500).json({
            message: 'Ошибка бля'
        })
        
    }
})

module.exports = router