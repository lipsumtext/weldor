import './RulesModal.styles.css'

export const RulesModal = ({ onClose }) => {
    return (
        <div className="overlay">
            <div className="rules-modal">
                <div className='title-bar'>
                    <button onClick={onClose}>✖</button>
                </div>
                <div className="welcome">
                    <h1>Welcome to Weldor</h1>
                    <p>
                        Our own twist on the internet classic, Wordle. Test your vocabulary and, more importantly, your anagram skills in this challenging, yet fun, word game.
                    </p>
                </div>
                <div className="how-to-play">
                    <h3>How to play: </h3>
                    <p>
                        Enter any 6-letter word that comes to mind. The corresponding boxes will be marked accordingly:
                        <br /><br />
                        🟩 – The letter is within any word in the anagram set.
                        <br /><br />
                        🟥 – The letter is NOT in the anagram set.
                        <br /><br />
                        🟨 – The letter is within any word in the anagram set, BUT of the wrong count (try thinking of words with more or less of this letter)
                        <br /><br />
                        Once you make a correct guess, come up with 2 anagrams for that word to win!
                        <br /><br />
                    </p>
                    <h4>Enjoy! 😄</h4>
                </div>
                <div className="play-weldor">
                    <button onClick={onClose}>Play Weldor</button>
                </div>
            </div>
        </div>
    )
}