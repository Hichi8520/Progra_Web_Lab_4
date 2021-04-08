const express = require('express')
const router = express.Router()
const Episode = require('../models/episode')

router.get('/episodes', async(req, res) => {
    try{
            const episodes = await Episode.find()
            res.status(200).json(episodes)
    }catch(err){
        res.status(404).send('Error ' + err)
    }
})

router.get('/episodes/:id', async(req, res) => {
    try{
            const episode = await Episode.findById(req.params.id)
            res.status(200).json(episode)
    }catch(err){
        res.status(404).send('Error ' + err)
    }
})

router.post('/episodes', async(req, res) => {
    const episode = new Episode({
        title: req.body.title,
        season: req.body.season,
        episode: req.body.episode,
        air_date: req.body.air_date
    })

    try{
        const c1 = await episode.save()
        //res.json(c1)
        res.sendStatus(201)
    }catch(err){
        res.status(404).send('Error')
    }
})

router.patch('/episodes/:id', async(req, res) => {
    try{
        const episode = await Episode.findById(req.params.id)

        if(req.body.title){
            episode.title = req.body.title
        }
        if(req.body.season){
            episode.season = req.body.season
        }
        if(req.body.episode){
            episode.episode = req.body.episode
        }
        if(req.body.air_date){
            episode.air_date = req.body.air_date
        }

        const c1 = await episode.save()
        //res.json(c1)
        res.sendStatus(204)
    }catch(err){
        res.status(404).send('Error')
    }
})

router.delete('/episodes/:id', async(req, res) => {
    try{
        const episode = await Episode.findByIdAndRemove(req.params.id)
        const c1 = await episode.remove()
        //res.json(c1)
        res.sendStatus(204)
    }catch(err){
        res.status(404).send('Error')
    }
})

module.exports = router