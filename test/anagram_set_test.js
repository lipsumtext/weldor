var assert = require('assert')

var index = require('../src/index')
const allEqual = arr => arr.every(val => val === arr[0]);

describe('#getAnagramSet()', function() {
    it('should return something when run wtihout a custom timestamp.', function(){
        assert.ok(index.getAnagramSet(6))
    })
    it('should return different sets with different length inputs.', function(){
        assert.notEqual(JSON.stringify(index.getAnagramSet(6)),JSON.stringify(index.getAnagramSet(7)))
    })
    it('should be consistent with a given Unix timestamp.', function(){
        assert.equal(JSON.stringify(index.getAnagramSet(7,1732162121000)),'["realist","saltier","retails"]')
    })
    it('should be consistent with different Unix timestamps within the same day.', function(){
        assert.equal(JSON.stringify(index.getAnagramSet(7,1732162121000)),JSON.stringify(index.getAnagramSet(7,1732162121000)))
    })
    it('should not give the same set on two consecutive days.', function(){
        assert.notEqual(JSON.stringify(index.getAnagramSet(7,173216206000)),JSON.stringify(index.getAnagramSet(7,1732162121000)))
    })
})
