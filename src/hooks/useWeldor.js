import { useEffect, useState } from "react"
import { useWordChecker } from 'react-word-checker'
import anagram5 from '../anagram_sets/5.json'
import anagram6 from '../anagram_sets/6.json'
import anagram7 from '../anagram_sets/7.json'

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

    // const anagramFile = require('json!../anagram_sets/'+length+'.json')
    let anagramFile = {"total":0}
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

    let index = random_number % anagramFile["total"]
    let result = anagramFile["anagrams"][index]
    return result
}

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