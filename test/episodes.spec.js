const assert = require('chai').assert;
const expect = require('chai').expect;
const episodes = require('../routes/episodes')
const axios = require('axios')

let Episode = require('../models/episode');
let chai = require('chai');
let chaiHttp = require('chai-http');
var should = require('chai').should();
let app = require('../app');


chai.use(chaiHttp);

describe('/GET episodes', () => {
    it('should GET all the episodes', (done) => {
        chai.request('http://localhost:9000/api/v1')
        .get('/episodes')
        .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                //res.body.length.should.be.eql(0);
            done();
        });
    });
});


describe('/GET/:id episode', () => {
    it('should GET a episode by the given id', (done) => {
        let episode = new Episode({ title: "Ozymandias", season: "5", episode: "5", air_date: "15-06-2010" });
        episode.save((err, episode) => {
            chai.request('http://localhost:9000/api/v1')
                .get('/episodes/' + episode.id)
                .send(episode)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('season');
                    res.body.should.have.property('episode');
                    res.body.should.have.property('air_date');
                    res.body.should.have.property('_id').eql(episode.id);
                    done();
                });
        });

    });
});

describe('/POST episode', () => {
    it('should not POST a episode without title field', (done) => {
        let episode = {
            season: "5",
            episode: "3",
            air_date: "13-03-2010"
        }
        chai.request('http://localhost:9000/api/v1')
            .post('/episodes')
            .send(episode)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
    it('should POST a episode ', (done) => {
        let episode = {
            title: "Clear Blue",
            season: "2",
            episode: "2",
            air_date: "12-05-2010"
        }
        chai.request('http://localhost:9000/api/v1')
            .post('/episodes')
            .send(episode)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});


describe('/PATCH/:id episode', () => {
    it('it should UPDATE a episode given the id', (done) => {
        let episode = new Episode({ title: "Crazy day", season: "4", episode: "4", air_date: "21-08-2011" })
        episode.save((err, episode) => {
            chai.request('http://localhost:9000/api/v1')
                .patch('/episodes/' + episode.id)
                .send({ title: "Crazy day 2", season: "5", episode: "7", air_date: "21-08-2013" })
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });
});


describe('/DELETE/:id episode', () => {
    it('should DELETE a episode given the id', (done) => {
        let episode = new Episode({ title: "Trains", season: "3", episode: "1", air_date: "01-11-2009" })
        episode.save((err, episode) => {
            chai.request('http://localhost:9000/api/v1')
                .delete('/episodes/' + episode.id)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });
});
