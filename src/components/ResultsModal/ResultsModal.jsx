import './ResultsModal.styles.css'
import { TwitterShareButton, XIcon } from 'react-share'
 
export const ResultsModal = ({ onClose, weldorInstance }) => {
    const {
        winConditionMet,
        loseConditionMet,
        score,
        guessedWordSet,
        activeBoxKey,
        anagramSetSelected,
        emojified,
    } = weldorInstance

    const remaining = (wordSet, anagramSet) => {
        return anagramSet.filter((word) => !wordSet.includes(word.toUpperCase()))
    }

    const remainingWords = remaining(guessedWordSet, anagramSetSelected).join(', ')

    const url = 'https://weldor.pages.dev/'
    const title = ((winConditionMet 
                        ? "I got today's Weldor daily anagram set within (" + String(activeBoxKey) + '/10) attempts!\n\n'
                        : "Today's Weldor daily anagram set is a tough one!\n\n"
                    )
        + emojified
        + '\n'
        + 'Play now: '
    )

    return (
        <div className="results-modal">
            <h1>Results</h1>
            <p>{winConditionMet ? 'You win!' : loseConditionMet ? "You're out of attempts. Sorry :(" : ''}</p>
            <p>Score: {score}</p>
            <p>{score == 0 ? 'Answers:' : 'Other answer(s):'} {remainingWords}</p>
            <p style={{whiteSpace: "pre-wrap", pointerEvents: "none", userSelect: "none"}}>{emojified}</p>
            <div className="close-results">
                <button onClick={onClose}>Close</button>
                <TwitterShareButton url={url} title={title}>
                    <XIcon size={32} round />
                </TwitterShareButton>

            </div>
        </div>
    )
}