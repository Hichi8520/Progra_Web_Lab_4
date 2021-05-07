const express = require('express')
const router = express.Router()
const Character = require('../models/character')
const cors = require('cors')

router.use(cors())

router.get('/characters', async(req, res) => {
    try{
            const characters = await Character.find()
            res.status(200).json(characters)
    }catch(err){
        res.status(404).send('Error ' + err)
    }
})

router.get('/characters/:id', async(req, res) => {
    try{
            const character = await Character.findById(req.params.id)
            res.status(200).json(character)
    }catch(err){
        res.status(404).send('Error ' + err)
    }
})

router.post('/characters', async(req, res) => {
    const character = new Character({
        name: req.body.name,
        nickname: req.body.nickname,
        occupation: req.body.occupation,
        portrayed: req.body.portrayed
    })

    try{
        const c1 = await character.save()
        //res.json(c1)
        res.sendStatus(201)
    }catch(err){
        res.status(404).send('Error')
    }
})

router.patch('/characters/:id', async(req, res) => {
    try{
        const character = await Character.findById(req.params.id)

        if(req.body.name){
            character.name = req.body.name
        }
        if(req.body.nickname){
            character.nickname = req.body.nickname
        }
        if(req.body.occupation){
            character.occupation = req.body.occupation
        }
        if(req.body.portrayed){
            character.portrayed = req.body.portrayed
        }

        const c1 = await character.save()
        //res.json(c1)
        res.sendStatus(204)
    }catch(err){
        res.status(404).send('Error')
    }
})

router.delete('/characters/:id', async(req, res) => {
    try{
        const character = await Character.findByIdAndRemove(req.params.id)
        const c1 = await character.remove()
        //res.json(c1)
        res.sendStatus(204)
    }catch(err){
        res.status(404).send('Error')
    }
})

module.exports = router