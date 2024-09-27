const checkWord = require('check-word')
const words = checkWord('en')

const anagramSet = require('./anagram_set.json')

const checkIfWord = (word) => {
    return words.check(word)
}

const returnColor = (word, wordSet, length) => {
    if (checkIfWord(word) && word.length == length) {
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
    } 
    return false
}

const rl = require('readline-sync')

const gameLoop = () => {
    let count = 0, requiredLength = 6, winConditionMet = false
    let resultColors = [], correctWords = []
    while (count < 6) {
        if (correctWords.length == 3) {
            winConditionMet = true
            break
        }
        console.log(resultColors)
        let answer = rl.question('Please enter a six-letter word: ')
        if (!(correctWords.includes(answer))) {
            let result = returnColor(answer, anagramSet['sixLetterSet'][0], requiredLength)
            if (!result) {
                continue
            } else if (result == ('G'.repeat(requiredLength))) {
                correctWords.push(answer)
            }
            resultColors.push(result)
            count++
        }
    }
    console.log(resultColors)
    console.log(winConditionMet ? 'You win!' : 'You\'re out of attempts. Sorry :(')
}

gameLoop()

module.exports = { checkIfWord, returnColor }
