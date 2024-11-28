import './ResultsModal.styles.css'

export const ResultsModal = ({ onClose, weldorInstance }) => {
    const {
        winConditionMet,
        loseConditionMet,
        score
    } = weldorInstance

    return (
        <div className="results-modal">
            <h1>Results</h1>
            <p>{winConditionMet ? 'You win' : loseConditionMet ? 'You lose' : ''}</p>
            <p>Score: {score}</p>
            <button onClick={onClose}>Close</button>
        </div>
    )
}