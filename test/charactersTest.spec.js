const assert = require('chai').assert;
const expect = require('chai').expect;
const characters = require('../routes/characters')
const axios = require('axios')

describe('async test Characters', () => {
    it('should get an specific character', () => {
        return axios.get('http://localhost:9000/api/v1/characters/605040e05e4b051144258b2e').then((res) => {
            expect(res.data.name).to.be.equal('Walter White')
            expect(res.data.nickname).to.be.equal('Heisenberg')
            expect(res.data.occupation).to.be.equal('Chemistry Teacher')
            expect(res.data.portrayed).to.be.equal('Bryan Cranston')
        })
    });

    it('should get an specific episode', () => {
        return axios.get('http://localhost:9000/api/v1/episodes/606f4a349685d91f24d362b9').then((res) => {
            expect(res.data.title).to.be.equal('Pilot')
            expect(res.data.season).to.be.equal('1')
            expect(res.data.episode).to.be.equal('1')
            expect(res.data.air_date).to.be.equal('20-01-2008')
        })
    });
});