import { useState } from "react"
import anagramSet from '../../src/data/anagramSet.json'
import { useWordChecker } from 'react-word-checker'

export const useWeldor = () => {
    const [guessedWord, setGuessedWord] = useState('')
    const [guessedWordSet, setGuessedWordSet] = useState([...Array.from({ length: 10 }, () => '')])
    const [boxStatusSet, setBoxStatusSet] = useState([...Array.from({ length: 10 }, () => 
                                                        [...Array.from({ length: 6 }, () => '')]
                                                    )])
    const [activeBoxKey, setActiveBoxKey] = useState(0)
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
        setGuessedWordSet((prev) => {
            const newGuessedWordSet = [...prev]
            newGuessedWordSet[activeBoxKey] = guessedWord.toUpperCase()
            return newGuessedWordSet
        })
        setBoxStatusSet((prev) => {
            const newBoxStatusSet = [...prev]
            newBoxStatusSet[activeBoxKey] = mapBoxStatus(result)
            return newBoxStatusSet
        })
        setActiveBoxKey(activeBoxKey + 1)
        setGuessedWord('')
        return result
    }

    const handleUserInput = ({ key }) => {
        if (key === 'Backspace') {
            setGuessedWord((prev) => prev.slice(0, -1))
        } else if (key === 'Enter') {
            if (guessedWord.length == 6) {
                returnColor(guessedWord, anagramSet['sixLetterSet'][0])
            }
        } else if (/^[a-zA-Z]$/.test(key)) {
            if (guessedWord.length < 6) {
                setGuessedWord((prev) => prev + key)
            }
        } 
    }

    return { guessedWord, guessedWordSet, boxStatusSet, activeBoxKey, handleUserInput }
}