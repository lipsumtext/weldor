import { useState } from "react"
import anagramSet from '../../src/data/anagramSet.json'
import { useWordChecker } from 'react-word-checker'

export const useWeldor = () => {
    const [guessedWord, setGuessedWord] = useState('')
    const [boxStatus, setBoxStatus] = useState([...Array.from({ length: 6 }, () => '')])
    const [result, setResult] = useState('')
    const { wordExists } = useWordChecker('en')

    const mapBoxStatus = (result = []) => {
        const values = {
            G: 'letter-box valid',
            Y: 'letter-box ambiguous',
            R: 'letter-box invalid'
        }

        return [...Array.from({ length: 6 }, (_, i) => (values[result[i]] || 'letter-box'))]
    }

    const returnColor = (word, wordSet) => {
        if (!wordExists(word)) return
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
        let mapped = mapBoxStatus(result)
        setBoxStatus(mapped)
        return result
    }

    const handleUserInput = ({ key }) => {
        if (key === 'Backspace') {
            setGuessedWord((prev) => prev.slice(0, -1))
        } else if (key === 'Enter') {
            if (guessedWord.length == 6) {
                console.log('entered')
                setResult(() => returnColor(guessedWord, anagramSet['sixLetterSet'][0]))
            }
        } else if (/^[a-zA-Z]$/.test(key)) {
            if (guessedWord.length < 6) {
                setGuessedWord((prev) => prev + key.toLowerCase())
            }
        } 
    }

    return { result, guessedWord, boxStatus, handleUserInput }
}