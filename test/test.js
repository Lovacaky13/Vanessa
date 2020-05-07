const assert = require('assert'),
    mocha = require('mocha'),
    Article = require('../api/db/models/Article')

describe('saving to mongodb', function() {
    it('save to a database', function() {
        let Art = new Article({
            title: 'test mocha'
        })
        Art.save().then(function() {
            assert(char.isNew === false)
        })
    })
})