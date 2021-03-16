const express = require('express')
const router = express.Router()
const Character = require('../models/character')

router.get('/', async(req, res) => {
    try{
            const characters = await Character.find()
            res.json(characters)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req, res) => {
    try{
            const character = await Character.findById(req.params.id)
            res.json(character)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.post('/', async(req, res) => {
    const character = new Character({
        name: req.body.name,
        nickname: req.body.nickname,
        occupation: req.body.occupation,
        portrayed: req.body.portrayed
    })

    try{
        const c1 = await character.save()
        res.json(c1)
    }catch(err){
        res.send('Error')
    }
})

router.patch('/:id', async(req, res) => {
    try{
        const character = await Character.findById(req.params.id)
        character.name = req.body.name
        const c1 = await character.save()
        res.json(c1)
    }catch(err){
        res.send('Error')
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const character = await Character.findByIdAndRemove(req.params.id)
        const c1 = await character.remove()
        res.json(c1)
    }catch(err){
        res.send('Error')
    }
})

module.exports = router