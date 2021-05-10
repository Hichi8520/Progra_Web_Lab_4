const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')
const cors = require('cors')

router.use(cors())

/**
 * @swagger
 * /api/v1/quotes:
 *  get:
 *      description: Use to request all the quotes
 *      responses:
 *          '200':
 *              description: A successful response
 *          '404':
 *              description: A failed response
 */
router.get('/quotes', async(req, res) => {
    try{
            const quotes = await Quote.find()
            res.status(200).json(quotes)
    }catch(err){
        res.status(404).send('Error ' + err)
    }
})

/**
 * @swagger
 * /api/v1/quotes/{id}:
 *  get:
 *      description: Use to request a specific quote by id
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *              description: the quote id
 *      responses:
 *          '200':
 *              description: A successful response
 *          '404':
 *              description: The quote id was not found
 */
router.get('/quotes/:id', async(req, res) => {
    try{
            redis.GET(req.params.id, async function(err, reply) {
                if (err) {
                    res.status(404).send('Error ' + err)
                }
                else if (reply) {
                    res.status(200).json(reply);
                }
                else {
                    const quote = await Quote.findById(req.params.id)
                    res.status(200).json(quote)
                    redis.set(req.params.id, JSON.stringify(quote))
                }
            })
            
    }catch(err){
        res.status(404).send('Error ' + err)
    }
})

/**
 * @swagger
 * /api/v1/quotes:
 *  post:
 *      description: Use to create a new quote
 *      responses:
 *          '201':
 *              description: The quote was created successfully
 *          '404':
 *              description: The quote could not be created
 */
router.post('/quotes', async(req, res) => {
    const quote = new Quote({
        quote: req.body.quote,
        author: req.body.author
    })

    try{
        const c1 = await quote.save()
        //res.json(c1)
        res.sendStatus(201)
    }catch(err){
        res.status(404).send('Error')
    }
})

/**
 * @swagger
 * /api/v1/quotes:
 *  patch:
 *      description: Use to update the info of a specific quote by id
 *      responses:
 *          '204':
 *              description: The quote was updated successfully
 *          '404':
 *              description: The quote could not be updated
 */
router.patch('/quotes/:id', async(req, res) => {
    try{
        const quote = await Quote.findById(req.params.id)

        if(req.body.quote){
            quote.quote = req.body.quote
        }
        if(req.body.author){
            quote.author = req.body.author
        }

        const c1 = await quote.save()
        //res.json(c1)
        res.sendStatus(204)

        redis.set(req.params.id, JSON.stringify(quote))

    }catch(err){
        res.status(404).send('Error')
    }
})

/**
 * @swagger
 * /api/v1/quotes:
 *  delete:
 *      description: Use to delete a specific quote by id
 *      responses:
 *          '204':
 *              description: The quote was deleted successfully
 *          '404':
 *              description: The quote could not be deleted
 */
router.delete('/quotes/:id', async(req, res) => {
    try{
        const quote = await Quote.findByIdAndRemove(req.params.id)
        const c1 = await quote.remove()
        //res.json(c1)
        res.sendStatus(204)
    }catch(err){
        res.status(404).send('Error')
    }
})

module.exports = router