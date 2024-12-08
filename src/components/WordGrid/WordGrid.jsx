import { useEffect, useState } from "react"
import { useWeldor } from "../../hooks/useWeldor"
import './WordGrid.styles.css'

const Row = ({ word, savedWord, boxStatus, isActive, isShake }) => {
    let toShake = ''
    if (isShake) toShake = ' shake'
    return (
        <div className={"row-container"}>
            {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className={(boxStatus[i] || 'letter-box')+toShake}>
                    {isActive ? word[i] || '' : savedWord[i]}
                </div>
            ))}
        </div>
    )
}

export const WordGrid = ({ rulesModalActive, weldorInstance }) => {
    const {
        guessedWord,
        guessedWordSet,
        boxStatusSet,
        activeBoxKey,
        handleUserInput,
        shake
    } = weldorInstance

    useEffect(() => {
        if (rulesModalActive) return
        window.addEventListener('keyup', handleUserInput)
        return () => window.removeEventListener('keyup', handleUserInput)
    }, [handleUserInput])

    const [toShake, setToShake] = useState(false)

    useEffect(() => {
        setToShake(shake)
    }, [shake])

    return (
        <div className="container">
            {Array.from({ length: 10 }, (_, i) => (
                <Row word={guessedWord.toUpperCase()}
                    savedWord={guessedWordSet[i]}
                    boxStatus={boxStatusSet[i]}
                    isActive={i === activeBoxKey}
                    isShake={toShake && (i === activeBoxKey)}
                />
            ))}
        </div>
    )
}