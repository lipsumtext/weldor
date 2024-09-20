var checkWord = require('check-word')
words = checkWord('en')

const checkIfWord = function (word) {
    return words.check(word)
}

module.exports = { checkIfWord }
