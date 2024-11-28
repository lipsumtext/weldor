import './NavBar.styles.css'

export const NavBar = ({ setShowRules }) => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <h1>Weldor</h1>
                </li>
                <li>
                    <button onClick={() => setShowRules(true)}>Show rules</button>
                </li>
            </ul>
        </nav>
    )
}