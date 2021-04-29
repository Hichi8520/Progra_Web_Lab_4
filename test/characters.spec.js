const assert = require('chai').assert;
const expect = require('chai').expect;
const characters = require('../routes/characters')
const axios = require('axios')

let Character = require('../models/character');
let chai = require('chai');
let chaiHttp = require('chai-http');
var should = require('chai').should();
let app = require('../app');


chai.use(chaiHttp);

describe('/GET characters', () => {
    it('should GET all the characters', (done) => {
        chai.request('http://localhost:9000/api/v1')
        .get('/characters')
        .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                //res.body.length.should.be.eql(0);
            done();
        });
    });
});


describe('/GET/:id character', () => {
    it('should GET a character by the given id', (done) => {
        let character = new Character({ name: "Gustavo Fring", nickname: "Gus", occupation: "Bad guy", portrayed: "Giancarlo Esposito" });
        character.save((err, character) => {
            chai.request('http://localhost:9000/api/v1')
                .get('/characters/' + character.id)
                .send(character)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('nickname');
                    res.body.should.have.property('occupation');
                    res.body.should.have.property('portrayed');
                    res.body.should.have.property('_id').eql(character.id);
                    done();
                });
        });

    });
});

describe('/POST character', () => {
    it('should not POST a character without name field', (done) => {
        let character = {
            nickname: "Sky",
            occupation: "Mother",
            portrayed: "Anna Gunn"
        }
        chai.request('http://localhost:9000/api/v1')
            .post('/characters')
            .send(character)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
    it('should POST a character ', (done) => {
        let character = {
            name: "Skyler White",
            nickname: "Sky",
            occupation: "Mother",
            portrayed: "Anna Gunn"
        }
        chai.request('http://localhost:9000/api/v1')
            .post('/characters')
            .send(character)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});


describe('/PATCH/:id character', () => {
    it('it should UPDATE a character given the id', (done) => {
        let character = new Character({ name: "Krazy8", nickname: "Krazy8", occupation: "Drug dealer", portrayed: "Emilio" })
        character.save((err, character) => {
            chai.request('http://localhost:9000/api/v1')
                .patch('/characters/' + character.id)
                .send({ name: "Krazy9", nickname: "Krazy9", occupation: "Dealer", portrayed: "Emiliano" })
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });
});


describe('/DELETE/:id character', () => {
    it('should DELETE a character given the id', (done) => {
        let character = new Character({ name: "Bogdan", nickname: "Bog", occupation: "Car washer", portrayed: "Guy" })
        character.save((err, character) => {
            chai.request('http://localhost:9000/api/v1')
                .delete('/characters/' + character.id)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });
});
