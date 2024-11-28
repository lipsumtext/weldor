import { WordGrid } from "./components/WordGrid/WordGrid"
import { Keyboard } from "./components/Keyboard/Keyboard"
import { useWeldor } from "./hooks/useWeldor"
import { useState } from "react"
import { createPortal } from "react-dom"
import { RulesModal } from "./components/RulesModal/RulesModal"
import { NavBar } from "./components/NavBar/NavBar"
import { ResultsModal } from "./components/ResultsModal/ResultsModal"

function App() {
    const weldorInstance = useWeldor()
    const [showRules, setShowRules] = useState(true)
    const [showResults, setShowResults] = useState(true)

    return (
      <>
        {showRules && createPortal(
          <RulesModal onClose={() => setShowRules(false)} />,
          document.body
        )}
        {((weldorInstance.winConditionMet || weldorInstance.loseConditionMet) 
          && showResults
        ) && createPortal(
          <ResultsModal onClose={() => setShowResults(false)}/>,
          document.body
        )}
        <NavBar setShowRules={setShowRules}/>
        <WordGrid weldorInstance={weldorInstance}/>
        <br></br>
        <br></br>
        <Keyboard weldorInstance={weldorInstance} />
      </>
    )
}
  
export default App