const checkWord = require('check-word')
const words = checkWord('en')

const checkIfWord = (word) => {
    return words.check(word)
}

const isaac = require( 'isaac')

const getAnagramSet = (length, timestamp=-1) => {
    // Set the days since Unix epoch to use for randomization.
    // Use either current time, or a given timestamp.
    let unixdate = timestamp
    if (unixdate == -1) unixdate = new Date()
    unixdate = 536870911 + Math.floor(unixdate/(8.64e7))

    isaac.seed(unixdate)
    isaac.prng(10)
    let random_number = Math.abs(isaac.rand())

    const anagramFile = require('./anagram_sets/'+length+'.json')
    // Condition checking.
    let index = random_number % anagramFile["total"]
    let result = anagramFile["anagrams"][index]
    return result
}

const returnColor = (word, wordSet, length) => {
    if (checkIfWord(word) && word.length == length) {
        let result = '' // Green = G, Yellow = Y, Red = R
        let charCounter = (w) => {
            let count = {}
            for (let c of w) 
                count[c] = (count[c] || 0) + 1
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
    let anagramSet = getAnagramSet(6)
    while (count < 10) {
        if (correctWords.length == 3) {
            winConditionMet = true
            break
        }
        resultColors.forEach(color => console.log(color))
        let answer = rl.question('Please enter a six-letter word: ')
        if (!(correctWords.includes(answer))) {
            let result = returnColor(answer, anagramSet, requiredLength)
            if (!result) {
                continue
            } else if (result == ('G'.repeat(requiredLength))) {
                correctWords.push(answer)
            }
            resultColors.push(result)
            count++
        }
    }
    resultColors.forEach(color => console.log(color))
    console.log(winConditionMet ? 'You win!' : 'You\'re out of attempts. Sorry :(')
}

(require.main === module) ? gameLoop() : {}   // Run only when 'node index.js' is invoked

module.exports = { checkIfWord, returnColor, gameLoop, getAnagramSet }
