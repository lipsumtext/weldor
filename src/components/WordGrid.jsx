import { useEffect } from "react"
import { useWeldor } from "../hooks/useWeldor"
import './WordGrid.styles.css'

const Row = ({ word, boxStatus }) => {
    return (
        <div className="container">
            {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className={boxStatus[i] || 'letter-box'}>
                    {word[i] || ''}
                </div>
            ))}
        </div>
    )
}

export const WordGrid = () => {
    const { guessedWord, boxStatus, handleUserInput } = useWeldor()

    useEffect(() => {
        window.addEventListener('keyup', handleUserInput)

        return () => window.removeEventListener('keyup', handleUserInput)
    }, [handleUserInput])
    
    return (
        <>
            {Array.from({ length: 10 }, () => (
                <Row word={guessedWord.toUpperCase()} boxStatus={boxStatus}/>
            ))}
            <div>{guessedWord}</div>
        </>
    )
}