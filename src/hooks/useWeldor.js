import { useEffect, useState } from "react"
import { useWordChecker } from "react-word-checker"
import { getAnagramSet } from "./getAnagramSet"

export const useWeldor = () => {
    const [guessedWord, setGuessedWord] = useState('')
    const [guessedWordSet, setGuessedWordSet] = useState(
        JSON.parse(localStorage.getItem('guessedWordSet')) || 
        [...Array.from({ length: 10 }, () => '')]
    )
    const [boxStatusSet, setBoxStatusSet] = useState(
        JSON.parse(localStorage.getItem('boxStatusSet')) ||
        [...Array.from({ length: 10 }, () => [...Array.from({ length: 6 }, () => '')])]
    )
    const [keyStatusSet, setKeyStatusSet] = useState(
        JSON.parse(localStorage.getItem('keyStatusSet')) || 
        [...Array.from({ length: 26 }, () => '')]
    )
    const [emojified, setEmojified] = useState(localStorage.getItem('emojified') || '')
    const [activeBoxKey, setActiveBoxKey] = useState(JSON.parse(localStorage.getItem('activeBoxKey')) || 0)
    const [validWordCount, setValidWordCount] = useState(JSON.parse(localStorage.getItem('validWordCount')) || 0)
    const [winConditionMet, setWinConditionMet] = useState(JSON.parse(localStorage.getItem('winConditionMet')) || false)
    const [loseConditionMet, setLoseConditionMet] = useState(JSON.parse(localStorage.getItem('loseConditionMet')) || false)
    const [score, setScore] = useState(JSON.parse(localStorage.getItem('score')) || 0)
    const [shake, setShake] = useState(false)

    const { wordExists } = useWordChecker('en')

    const date = new Date()
    const presentDay = date.getUTCDay() + 1 // Ensure that we don't end up with 0th day

    // On mount, retrieves data from local storage if it exists                                               
    useEffect(() => {
        // Compare current date with previous date.
        // If different or value for previous date does not exist, clear local storage/reset all states:
        const previousDay = JSON.parse(localStorage.getItem('previousDay'))
        if (!previousDay || (presentDay !== previousDay)) {
            setGuessedWordSet([...Array.from({ length: 10 }, () => '')])
            setActiveBoxKey(0)
            setBoxStatusSet(
                [...Array.from({ length: 10 }, () => [...Array.from({ length: 6 }, () => '')])]
            )
            setKeyStatusSet([...Array.from({ length: 26 }, () => '')])
            setEmojified('')
            setValidWordCount(0)
            //setWinConditionMet(false)
            //setLoseConditionMet(false)
            setScore(0)
        }
        return
    }, [presentDay])

    // Sets and updates data on local storage                                            
    useEffect(() => {
        // Set states into respective local storage keys:
        localStorage.setItem('winConditionMet', winConditionMet)
        localStorage.setItem('guessedWordSet', JSON.stringify(guessedWordSet))
        localStorage.setItem('activeBoxKey', activeBoxKey)
        localStorage.setItem('boxStatusSet', JSON.stringify(boxStatusSet))
        localStorage.setItem('keyStatusSet', JSON.stringify(keyStatusSet))
        localStorage.setItem('emojified', emojified)
        localStorage.setItem('validWordCount', validWordCount)
        localStorage.setItem('loseConditionMet', loseConditionMet)
        localStorage.setItem('score', score)

        // Store presentDay into 'previousDay':
        localStorage.setItem('previousDay', presentDay)
        return
    }, [
        winConditionMet, 
        guessedWordSet, 
        activeBoxKey, 
        boxStatusSet, 
        keyStatusSet, 
        emojified, 
        validWordCount, 
        loseConditionMet,
        score,
        presentDay
    ])

    useEffect(() => {
        if (validWordCount == 3) {
            return setWinConditionMet(true)
        } else if (guessedWordSet.filter(Boolean).length == guessedWordSet.length) {
            return setLoseConditionMet(true)
        } else {
            setWinConditionMet(false)
            setLoseConditionMet(false)
            return
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

    // const anagramSetSelected = anagramSet['sixLetterSet'][0] // please adjust this depending on LS-7 implementation
    const anagramSetSelected = getAnagramSet(6)

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
                    setScore((prev) => prev == 2 ? prev + 3 : prev + 1)
                }
                else if (result == null){
                    // Shake shake shake!
                    setShake(true)
                    setTimeout(()=>{setShake(false)},1000)
                }
            }
            else if (guessedWordSet.includes(guessedWord.toUpperCase())) {
                setShake(true)
                setTimeout(()=>{setShake(false)},1000)
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
        handleUserInput,
        shake
    }
}