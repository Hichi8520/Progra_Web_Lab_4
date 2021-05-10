const express = require('express')
const router = express.Router()
const Episode = require('../models/episode')
const cors = require('cors')
// var redisClient = require('redis').createClient;
// var redis = redisClient(6379, 'redis');

router.use(cors())

/**
 * @swagger
 * /api/v1/episodes:
 *  get:
 *      description: Use to request all the episodes
 *      responses:
 *          '200':
 *              description: A successful response
 *          '404':
 *              description: A failed response
 */
router.get('/episodes', async(req, res) => {
    try{
            const episodes = await Episode.find()
            res.status(200).json(episodes)
    }catch(err){
        res.status(404).send('Error ' + err)
    }
})

/**
 * @swagger
 * /api/v1/episodes/{id}:
 *  get:
 *      description: Use to request a specific episode by id
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *              description: the episode id
 *      responses:
 *          '200':
 *              description: A successful response
 *          '404':
 *              description: The episode id was not found
 */
router.get('/episodes/:id', async(req, res) => {
    try{
        // redis.GET(req.params.id, async function(err, reply) {
        //     if (err) {
        //         res.status(404).send('Error ' + err)
        //     }
        //     else if (reply) {
        //         res.status(200).json(reply);
        //     }
        //     else {
                const episode = await Episode.findById(req.params.id)
                res.status(200).json(episode)
        //         redis.set(req.params.id, JSON.stringify(episode))
        //     }
        // })

    }catch(err){
        res.status(404).send('Error ' + err)
    }
})

/**
 * @swagger
 * /api/v1/episodes:
 *  post:
 *      description: Use to create a new episode
 *      responses:
 *          '201':
 *              description: The episode was created successfully
 *          '404':
 *              description: The episode could not be created
 */
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

/**
 * @swagger
 * /api/v1/episodes:
 *  patch:
 *      description: Use to update the info of a specific episode by id
 *      responses:
 *          '204':
 *              description: The episode was updated successfully
 *          '404':
 *              description: The episode could not be updated
 */
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

        // redis.set(req.params.id, JSON.stringify(episode))

    }catch(err){
        res.status(404).send('Error')
    }
})

/**
 * @swagger
 * /api/v1/episodes:
 *  delete:
 *      description: Use to delete a specific episode by id
 *      responses:
 *          '204':
 *              description: The episdoe was deleted successfully
 *          '404':
 *              description: The episode could not be deleted
 */
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