import { useState } from "react"
import anagramSet from '../../src/data/anagram_set.json'
/*
const checkWord = require('check-word')
const words = checkWord('en')
*/

export const useWeldor = () => {
    const [guessedWord, setGuessedWord] = useState('')

    /*
    const checkIfWord = (word) => {
        return words.check(word)
    }
    */

    const returnColor = (word, wordSet) => {
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

    const handleUserInput = ({ key }) => {
        if (key === 'Backspace') {
            setGuessedWord((prev) => prev.slice(0, -1))
        } else if (key === 'Enter') {
            if (guessedWord.length == 6) {
                console.log('entered')
                console.log(returnColor(guessedWord, anagramSet['sixLetterSet'][0]))
            }
        } else if (/^[a-zA-Z]*$/.test(key)) {
            if (guessedWord.length < 6)
                setGuessedWord((prev) => prev + key)
        }
    }

    return { guessedWord, handleUserInput }
}