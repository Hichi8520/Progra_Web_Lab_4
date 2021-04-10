const assert = require('chai').assert;
const expect = require('chai').expect;
const characters = require('../routes/characters')
const axios = require('axios')

describe('async test Characters', () => {
    it('should get an specific character', () => {
        axios.get('http://localhost:9000/api/v1/characters/605040e05e4b051144258b2e').then((res) => {
            expect(res.data.name).to.be.equal('Walter White')
        }).catch((err) => {
            
        });
    });
});