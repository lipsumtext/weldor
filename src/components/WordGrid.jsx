import { useEffect } from "react"
import { useWeldor } from "../hooks/useWeldor"

export const WordGrid = () => {
    const { guessedWord, handleUserInput } = useWeldor()

    useEffect(() => {
        window.addEventListener('keyup', handleUserInput)
        
        return () => window.removeEventListener('keyup', handleUserInput)
    }, [handleUserInput])
    
    return (
        <div>{guessedWord}</div>
    )
}