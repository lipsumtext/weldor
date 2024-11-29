import { useEffect, useState } from "react"
import anagramSet from '../../src/data/anagramSet.json'
import { useWordChecker } from 'react-word-checker'

export const useWeldor = () => {
    const [guessedWord, setGuessedWord] = useState('')
    const [guessedWordSet, setGuessedWordSet] = useState([...Array.from({ length: 10 }, () => '')])
    const [boxStatusSet, setBoxStatusSet] = useState([...Array.from({ length: 10 }, () => 
                                                        [...Array.from({ length: 6 }, () => '')]
                                                    )])
    const [keyStatusSet, setKeyStatusSet] = useState([...Array.from({ length: 26 }, () => '')])
    const [emojified, setEmojified] = useState('')
    const [activeBoxKey, setActiveBoxKey] = useState(0)
    const [validWordCount, setValidWordCount] = useState(0)
    const [winConditionMet, setWinConditionMet] = useState(false)
    const [loseConditionMet, setLoseConditionMet] = useState(false)
    const [score, setScore] = useState(0)
    const { wordExists } = useWordChecker('en')

    useEffect(() => {
        if (validWordCount == 3) {
            setScore(score + 2)
            return setWinConditionMet(true)
        } else if (guessedWordSet[guessedWordSet.length - 1] !== '') {
            return setLoseConditionMet(true)
        }
    }, [validWordCount, guessedWordSet])

    const mapBoxStatus = (result = []) => {
        const values = {
            G: 'letter-box valid',
            Y: 'letter-box ambiguous',
            R: 'letter-box invalid'
        }

        return [...Array.from({ length: 6 }, (_, i) => (values[result[i]] || 'letter-box'))]
    }

    const mapKeyStatus = (result = []) => {
        const values = {
            G: 'key-box key-valid',
            Y: 'key-box key-valid',
            R: 'key-box key-invalid'
        }

        return [...Array.from({ length: 6 }, (_, i) => (values[result[i]] || 'letter-box'))]
    }

    const mapEmoji = (rowStatus) => {
        const values = {
            'letter-box valid': '🟩',
            'letter-box ambiguous': '🟨',
            'letter-box invalid': '🟥'
        }

        let emojified = rowStatus.map((boxStatus) => (values[boxStatus]))
        return emojified.join('') + '\n'
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
        setEmojified((prev) => prev + mapEmoji(mapBoxStatus(result)))
        setKeyStatusSet((prev)=> {
            const newKeyStatusSet = [...prev]
            const valKeyStatusSet =  mapKeyStatus(result)
            for (let i=0;i<6;i=i+1){
                let index = word[i].charCodeAt(0)-96
                if (index<0) index = word[i].charCodeAt(0)-64
                newKeyStatusSet[index-1]=valKeyStatusSet[i]
            }
            return newKeyStatusSet
        })
        setActiveBoxKey(activeBoxKey + 1)
        setGuessedWord('')
        return result
    }

    const anagramSetSelected = anagramSet['sixLetterSet'][0] // please adjust this depending on LS-7 implementation

    const handleUserInput = ({ key }) => {
        if (winConditionMet || loseConditionMet){
            return
        }
        if (key === 'Backspace') {
            setGuessedWord((prev) => prev.slice(0, -1))
        } else if (key === 'Enter') {
            if (guessedWord.length == 6 && !guessedWordSet.includes(guessedWord.toUpperCase())) {
                let result = returnColor(guessedWord, anagramSetSelected)
                if (result === 'G'.repeat(guessedWord.length)) {
                    setValidWordCount(validWordCount + 1)
                    setScore(score + 1)
                }
            }
        } else if (/^[a-zA-Z]$/.test(key)) {
            if (guessedWord.length < 6) 
                setGuessedWord((prev) => prev + key.toLowerCase())
        } 
    }

    return { 
        guessedWord, 
        guessedWordSet, 
        boxStatusSet, 
        activeBoxKey,
        winConditionMet, 
        loseConditionMet,
        keyStatusSet,
        score,
        anagramSetSelected,
        emojified,
        handleUserInput 
    }
}