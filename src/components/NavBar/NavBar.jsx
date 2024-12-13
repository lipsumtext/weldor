import './NavBar.styles.css'

export const NavBar = ({ setShowRules, setDarkMode, darkMode }) => {
    return (
        <nav className="navbar">
            <h1 className='title' style={{letterSpacing: '0.125rem'}}>WELDOR</h1>
            <ul>
                <li>
                    <button className='navbar-item' onClick={() => setShowRules(true)}>?</button>
                </li>
                <li>
                    <button 
                        className='navbar-item' 
                        onClick={(e) => {
                            setDarkMode((prev) => !prev)
                            e.target.blur() // Prevents enter key from triggering button if pressed once
                        }}
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </li>
            </ul>
        </nav>
    )
}