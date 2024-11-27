import './RulesModal.styles.css'

export const RulesModal = ({ onClose }) => {
    return (
        <div className="modal">
            <h1>Rules</h1>
            <button onClick={onClose}>Close</button>
        </div>
    )
}