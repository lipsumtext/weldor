var assert = require('assert')

var index = require('../src/index')
var anagramSet = require('../src/anagram_set.json')

describe('#returnColor()', function() {
  it('should return a color combination if word is valid', function() {
    assert.equal(index.returnColor('stairs', anagramSet['sixLetterSet'][0], 6), 'RGGRGR')
  })
  it('should return false if word is invalid', function() {
    assert.equal(index.checkIfWord('abcdef'), false)
  })
})
