import './ResultsModal.styles.css'

export const ResultsModal = ({ onClose, weldorInstance }) => {
    const {
        winConditionMet,
        loseConditionMet,
        score,
        guessedWordSet,
        anagramSetSelected
    } = weldorInstance

    const remaining = (wordSet, anagramSet) => {
        return anagramSet.filter((word) => !wordSet.includes(word.toUpperCase()))
    }

    const remainingWords = remaining(guessedWordSet, anagramSetSelected).join(', ')

    return (
        <div className="results-modal">
            <h1>Results</h1>
            <p>{winConditionMet ? 'You win!' : loseConditionMet ? "You're out of attempts. Sorry :(" : ''}</p>
            <p>Score: {score}</p>
            <p>{score == 0 ? 'Answers:' : 'Other answer(s):'} {remainingWords}</p>
            <button onClick={onClose}>Close</button>
        </div>
    )
}