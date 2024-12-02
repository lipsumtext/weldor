import './NavBar.styles.css'

export const NavBar = ({ setShowRules, setDarkMode }) => {
    return (
        <nav className="navbar">
            <h1 className='title'>Weldor</h1>
            <ul>
                <li>
                    <button className='rules' onClick={() => setShowRules(true)}>?</button>
                </li>
                <li>
                    <button onClick={() => setDarkMode((prev) => !prev)}>Dark mode</button>
                </li>
            </ul>
        </nav>
    )
}