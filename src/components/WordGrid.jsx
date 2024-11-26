import { useEffect } from "react"
import { useWeldor } from "../hooks/useWeldor"
import './WordGrid.styles.css'

const Row = ({ word, savedWord, boxStatus, isActive }) => {
    return (
        <div className="container">
            {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className={boxStatus[i] || 'letter-box'}>
                    { isActive ? word[i] || '' : savedWord[i]}
                </div>
            ))}
        </div>
    )
}

export const WordGrid = () => {
    const { 
        guessedWord, 
        guessedWordSet, 
        boxStatusSet, 
        activeBoxKey, 
        winConditionMet,
        loseConditionMet,
        handleUserInput
    } = useWeldor()

    useEffect(() => {
        if (!winConditionMet && !loseConditionMet) {
            window.addEventListener('keyup', handleUserInput)
            return () => window.removeEventListener('keyup', handleUserInput)
        }
    }, [handleUserInput, winConditionMet, loseConditionMet])

    return (
        <>
            {Array.from({ length: 10 }, (_, i) => (
                <Row word={guessedWord.toUpperCase()} 
                    savedWord={guessedWordSet[i]} 
                    boxStatus={boxStatusSet[i]} 
                    isActive={i === activeBoxKey}
                />
            ))}
        </>
    )
}