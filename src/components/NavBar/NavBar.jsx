import './NavBar.styles.css'

export const NavBar = ({ setShowRules, setDarkMode, darkMode }) => {
    return (
        <nav className="navbar">
            <h1 className='title'>Weldor</h1>
            <ul>
                <li>
                    <button className='navbar-item' onClick={() => setShowRules(true)}>?</button>
                </li>
                <li>
                    <button className='navbar-item' onClick={() => setDarkMode((prev) => !prev)}>{darkMode ? '☀️' : '🌙'}</button>
                </li>
            </ul>
        </nav>
    )
}