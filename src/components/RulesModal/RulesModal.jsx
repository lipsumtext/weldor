import './RulesModal.styles.css'

export const RulesModal = ({ onClose }) => {
    return (
        <div className="modal">
            <div className='title-bar'>
                <button onClick={onClose}>✖</button>
            </div>
            <h1>Welcome to Weldor!</h1>
            <h3>How to play: </h3>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam error obcaecati aperiam voluptatibus in quos non quasi architecto excepturi, dolorum minima pariatur soluta deserunt molestiae dolore accusantium. Illo, dolor perspiciatis?
            </p>
            <div className="play-weldor">
                <button onClick={onClose}>Play Weldor</button>
            </div>
        </div>
    )
}