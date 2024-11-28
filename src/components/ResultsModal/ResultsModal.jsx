import './ResultsModal.styles.css'

export const ResultsModal = ({ onClose }) => {
    return (
        <div className="results-modal">
            <h1>Results</h1>
            <button onClick={onClose}>Close</button>
        </div>
    )
}