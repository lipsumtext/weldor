import { useEffect, useState } from 'react'
import './ResultsModal.styles.css'
import { TwitterShareButton, XIcon } from 'react-share'
 
export const ResultsModal = ({ weldorInstance,  }) => {
    const {
        winConditionMet,
        loseConditionMet,
        score,
        guessedWordSet,
        activeBoxKey,
        anagramSetSelected,
        emojified,
    } = weldorInstance
    const [countDown, setCountDown] = useState('')

    useEffect(() => {
        setInterval(() => {
            let now = new Date()
            let nowHours = now.getUTCHours()
            let nowMinutes = now.getUTCMinutes()
            let nowSeconds = now.getUTCSeconds()

            let hoursLeft = String(23 - nowHours).padStart(2, '0');
            let minutesLeft = String(59 - nowMinutes).padStart(2, '0');
            let secondsLeft = String(59 - nowSeconds).padStart(2, '0');

            return setCountDown(`${hoursLeft}:${minutesLeft}:${secondsLeft}`)
        }, 1000)
    }, [])

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
        <div className="overlay">
            <div className="results-modal">
                <h1>Results</h1>
                <div className="results-info">
                    <img 
                        src={winConditionMet
                            ? 'https://media.tenor.com/rdwERljov_AAAAAi/blue-archive-nozomi.gif'
                            : 'https://media.tenor.com/bYaZMlTg8MEAAAAi/tachibana-hikari-tachibana-nozomi.gif'
                        } 
                        width={75} 
                        height={75}
                    />
                    <h3>{winConditionMet ? 'You win! 🎉' : loseConditionMet ? "You're out of attempts, sorry. 😭" : ''}</h3>
                    <p>Score: {score}</p>
                    <p>{score == 0 ? 'Answers:' : 'Other answer(s):'}</p>
                    <p>{!remainingWords.length ? '-' : remainingWords}</p>
                    <p style={{whiteSpace: "pre-wrap", pointerEvents: "none", userSelect: "none", fontSize: '0.8rem'}}>{emojified}</p>
                </div>
                <p style={{fontSize: '0.85rem'}}>Resets in: {countDown}</p>
                <div className="close-results">
                    <h3>Share on Twitter/X: </h3>
                    <div className="share-twitter">
                        <TwitterShareButton url={url} title={title}>
                            <XIcon size={32} round />
                        </TwitterShareButton>
                    </div>
                </div>
            </div>
        </div>   
    )
}