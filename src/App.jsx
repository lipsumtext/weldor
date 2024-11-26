import { WordGrid } from "./components/WordGrid"
import { Keyboard } from "./components/Keyboard"
import './components/WordGrid.styles.css'
import { useWeldor } from "./hooks/useWeldor"

function App() {
    const weldorInstance = useWeldor()
    return (
      <><div id='app'>
        <h1>Weldor</h1>
        <WordGrid
        weldorInstance={weldorInstance}
        />
        <br></br>
        <br></br>
        <Keyboard weldorInstance={weldorInstance} />
        </div></>
    )
  }
  
  export default App