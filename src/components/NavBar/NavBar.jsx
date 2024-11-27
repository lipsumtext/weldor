import './NavBar.styles.css'

export const NavBar = ({ setShowRules }) => {
    return (
        <nav className="navbar">
            <h1>Weldor</h1>
            <button onClick={() => setShowRules(true)}>Show rules</button>
        </nav>
    )
}