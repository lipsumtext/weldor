const checkWord = require('check-word')
const words = checkWord('en')

//const anagramSet = require('./anagram_set.json')

const checkIfWord = (word) => {
    return words.check(word)
}

const returnColor = (word, wordSet) => {
    if (checkIfWord(word)) {
        let result = '' // Green = G, Yellow = Y, Red = R
        let charCounter = (w) => {
            let count = {}
            for (let c of w) {
                count[c] = (count[c] || 0) + 1
            }
            return count
        }
        let wordCharCount = charCounter(word), 
            wordSetCharCount = charCounter(wordSet[0])
        for (let c of word) {
            result += ((wordCharCount[c] && wordSetCharCount[c])
                ? ((wordCharCount[c] == wordSetCharCount[c]) ? 'G' : 'Y') 
                : 'R'
            )
        }
        return result
    } else {
        return false
    }
}

module.exports = { checkIfWord, returnColor }
