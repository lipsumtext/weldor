import './NavBar.styles.css'

export const NavBar = ({ setShowRules }) => {
    return (
        <nav className="navbar">
            <h1 className='title'>Weldor</h1>
            <ul>
                <li>
                    <button className='rules' onClick={() => setShowRules(true)}>?</button>
                </li>
            </ul>
        </nav>
    )
}