const assert = require('chai').assert;
const expect = require('chai').expect;
const characters = require('../routes/quotes')
const axios = require('axios')

let Quote = require('../models/quote');
let chai = require('chai');
let chaiHttp = require('chai-http');
var should = require('chai').should();
let app = require('../app');


chai.use(chaiHttp);

describe('/GET quotes', () => {
    it('should GET all the quotes', (done) => {
        chai.request('http://localhost:9000/api/v1')
        .get('/quotes')
        .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                //res.body.length.should.be.eql(0);
            done();
        });
    });
});

describe('/POST quote', () => {
    it('should not POST a quote without author field', (done) => {
        let quote = {
            quote: "Don't drink and drive. But if you do, call me."
        }
        chai.request('http://localhost:9000/api/v1')
            .post('/characters')
            .send(quote)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
    it('should POST a quote ', (done) => {
        let quote = {
            quote: "Don't drink and drive. But if you do, call me.",
            author: "Saul Goodman"
        }
        chai.request('http://localhost:9000/api/v1')
            .post('/quotes')
            .send(quote)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});
