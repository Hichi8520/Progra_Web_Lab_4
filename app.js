const express = require('express');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require("body-parser")
const url = 'mongodb+srv://LuisRoldan:contraseña@clusterbackend.qegr9.mongodb.net/BreakingSad?retryWrites=true&w=majority'
// const url = 'mongodb://localhost/BreakingSadDB'
// const redisClient = require('redis').createClient;
// const redis = redisClient(6379, 'redis');

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const charRouter = require('./routes/characters')
app.use('/api/v1',charRouter)

const epsRouter = require('./routes/episodes')
app.use('/api/v1',epsRouter)

const quoteRouter = require('./routes/quotes')
app.use('/api/v1',quoteRouter)

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Customer API',
            description: 'Customer API information',
            contact: {
                name: 'Developer'
            },
            servers: ['http://localhost:9000']
        }
    },
    apis: [
        './routes/characters.js',
        './routes/episodes.js',
        './routes/quotes.js'
    ]
};

swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(9000, () => {
    console.log('Server started')
})

/**
 * @swagger
 * definitions:
 *  Character:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *              description: The name of the character
 *              example: 'Todd'
 *          nickname:
 *              type: string
 *              description: The nickname of the character
 *              example: 'Blondie'
 *          occupation:
 *              type: string
 *              description: The occupation of the character
 *              example: 'Thug'
 *          portrayed:
 *              type: string
 *              description: The actor/actress who portrays the character
 *              example: 'Jesse Plemons'
 *  Episode:
 *      type: object
 *      properties:
 *          title:
 *              type: string
 *              description: The title of the episode
 *              example: 'Ozymandias'
 *          season:
 *              type: string
 *              description: The season of the episode
 *              example: '2'
 *          episode:
 *              type: string
 *              description: The number of the episode
 *              example: '3'
 *          air_date:
 *              type: string
 *              description: The date when the episode aired on TV
 *              example: '23-05-2009'
 *  Quote:
 *      type: object
 *      properties:
 *          quote:
 *              type: string
 *              description: The actual quote
 *              example: 'Some people are immune to good advice.'
 *          author:
 *              type: string
 *              description: The character who said the quote
 *              example: 'Saul Goodman'
 */