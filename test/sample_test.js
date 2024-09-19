var assert = require('assert')

var index = require('../src/index')

describe('#checkIfWord()', function() {
  it('should return true if valid word', function() {
    assert.equal(index.checkIfWord('dog'), true)
  })
  it('should return false if word does not exist', function() {
    assert.equal(index.checkIfWord('dgo'), false)
  })
  it('should return false if word contains non-alphabet characters', function() {
    assert.equal(index.checkIfWord('dog2'), false)
  })
  it('should return false if empty string', function() {
    assert.equal(index.checkIfWord(''), false)
  })
})
