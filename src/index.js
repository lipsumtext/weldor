var checkWord = require('check-word')
words = checkWord('en')

var anagramSet = require('./anagram_set.json')

const checkIfWord = function (word) {
    return words.check(word)
}

const returnColor = function (word) {
    //pass
}

module.exports = { checkIfWord }
