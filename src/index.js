const checkWord = require('check-word')
const words = checkWord('en')

const checkIfWord = (word) => {
    return words.check(word)
}

// import anagram5 from './anagram_sets/5.json' with { type: "json" }
// import anagram6 from './anagram_sets/6.json' with { type: "json" }
// import anagram7 from './anagram_sets/7.json' with { type: "json" }

const anagram5 = require('./data/anagram_sets/5.json')
const anagram6 = require('./data/anagram_sets/6.json')
const anagram7 = require('./data/anagram_sets/7.json')

const xorshift64 = (a) => {
    let x = a
    x ^= x << 13
    x ^= x >> 17
    x ^= x << 5
    return x
}

const getAnagramSet = (length, timestamp=-1) => {
    // Set the days since Unix epoch to use for randomization.
    // Use either current time, or a given timestamp.
    let unixdate = timestamp
    if (unixdate == -1) unixdate = new Date()
    unixdate = 536870911 + Math.floor(unixdate/(8.64e7))

    let anagramFile = {}
    if(length==5) anagramFile = anagram5
    if(length==6) anagramFile = anagram6
    if(length==7) anagramFile = anagram7

    let random_number = unixdate;
    for(let i=0;i<10;i=i+1) random_number = xorshift64(random_number)

    let random_number_prev = unixdate-1;
    for(let i=0;i<10;i=i+1) random_number_prev = xorshift64(random_number_prev)

    let random_number_prev_alt = random_number_prev;
    for(let i=0;i<10;i=i+1) random_number_prev_alt = xorshift64(random_number_prev_alt)


    if(random_number%anagramFile["total"]==random_number_prev%anagramFile["total"] ||
       random_number%anagramFile["total"]==random_number_prev_alt%anagramFile["total"]
     ){
        const offset = random_number%anagramFile["total"]
        for(let i=0;i<10;i=i+1) random_number = xorshift64(random_number)
    }

    let index = Math.abs(random_number % anagramFile["total"])
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

const gameLoop = (debug=false) => {
    let count = 0, requiredLength = 6, winConditionMet = false
    let resultColors = [], correctWords = []
    let anagramSet = []
    if (debug==true) anagramSet = ["canter","nectar","recant","trance"]
    else anagramSet = getAnagramSet(6)
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
