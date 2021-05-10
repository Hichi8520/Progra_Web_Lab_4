const express = require('express')
const router = express.Router()
const Character = require('../models/character')
const cors = require('cors')
const clearCache = require('../services/cache')
var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');

router.use(cors())

/**
 * @swagger
 * /api/v1/characters:
 *  get:
 *      description: Use to request all the characters
 *      responses:
 *          '200':
 *              description: A successful response
 *          '404':
 *              description: A failed response
 */
router.get('/characters', async(req, res) => {
    try{
            const characters = await Character.find()
            res.status(200).json(characters)
    }catch(err){
        res.status(404).send('Error ' + err)
    }
})

/**
 * @swagger
 * /api/v1/characters/{id}:
 *  get:
 *      description: Use to request a specific character by id
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *              description: the character id
 *      responses:
 *          '200':
 *              description: A successful response
 *          '404':
 *              description: The character id was not found
 */
router.get('/characters/:id', async(req, res) => {
    try{
            redis.GET(req.params.id, async function(err, reply) {
                if (err) {
                    res.status(404).send('Error ' + err)
                }
                else if (reply) {
                    res.status(200).json(reply);
                }
                else {
                    const character = await Character.findById(req.params.id)
                    res.status(200).json(character)
                    redis.set(req.params.id, JSON.stringify(character))
                }
            })
            
    }catch(err){
        res.status(404).send('Error ' + err)
    }
})

/**
 * @swagger
 * /api/v1/characters:
 *  post:
 *      description: Use to create a new character
 *      responses:
 *          '201':
 *              description: The character was created successfully
 *          '404':
 *              description: The character could not be created
 */
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
        //clearCache(v_data.vehicleType)
    }catch(err){
        res.status(404).send('Error')
    }
})

/**
 * @swagger
 * /api/v1/characters:
 *  patch:
 *      description: Use to update the info of a specific character by id
 *      responses:
 *          '204':
 *              description: The character was updated successfully
 *          '404':
 *              description: The character could not be updated
 */
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

        redis.set(req.params.id, JSON.stringify(character))

    }catch(err){
        res.status(404).send('Error')
    }
})

/**
 * @swagger
 * /api/v1/characters:
 *  delete:
 *      description: Use to delete a specific character by id
 *      responses:
 *          '204':
 *              description: The character was deleted successfully
 *          '404':
 *              description: The character could not be deleted
 */
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