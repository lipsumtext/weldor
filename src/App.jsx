import { WordGrid } from "./components/WordGrid/WordGrid"
import { Keyboard } from "./components/Keyboard/Keyboard"
import { useWeldor } from "./hooks/useWeldor"
import { useState } from "react"
import { createPortal } from "react-dom"
import { RulesModal } from "./components/RulesModal/RulesModal"
import { NavBar } from "./components/NavBar/NavBar"
import { ResultsModal } from "./components/ResultsModal/ResultsModal"
import { useMediaQuery } from "react-responsive"

function App() {
    const weldorInstance = useWeldor()
    const [showRules, setShowRules] = useState(true)
    const [showResults, setShowResults] = useState(true)
    const prefersDarkMode = useMediaQuery({query: '(prefers-color-scheme: dark)'})
    const [darkMode, setDarkMode] = useState(prefersDarkMode)

    return (
      <>
        {
          darkMode 
          ? document.body.classList.add('dark-mode') 
          : document.body.classList.remove('dark-mode')
        }
        {showRules && createPortal(
          <RulesModal onClose={() => setShowRules(false)} />,
          document.body
        )}
        {((weldorInstance.winConditionMet || weldorInstance.loseConditionMet) 
          && showResults
        ) && createPortal(
          <ResultsModal onClose={() => setShowResults(false)} weldorInstance={weldorInstance}/>,
          document.body
        )}
        <NavBar setShowRules={setShowRules} setDarkMode={setDarkMode} darkMode={darkMode} />
        <WordGrid rulesModalActive={showRules} weldorInstance={weldorInstance}/>
        <Keyboard weldorInstance={weldorInstance} />
        <p 
          style={{
            margin: 0,
            paddingTop: '25px', 
            paddingBottom: '20px', 
            textAlign: 'center'
          }}
        >
            Made with ♡ TLC ♡, by <a href="https://lipsumtext.pages.dev/" target="_blank" style={{color: 'inherit'}}>lipsumtext</a>, 2024.
        </p>
      </>
    )
}
  
export default App