import { useEffect } from "react"
import { useWeldor } from "../../hooks/useWeldor"
import './Keyboard.styles.css'

export const KeyButton = ({i,j,letter,handleUserInput}) => {
    const sendKeypress = (letter) => {
        let letterEvent = letter
        if(letterEvent == '1')letterEvent='Backspace'
        if(letterEvent == '2')letterEvent='Enter'
        handleUserInput({key:letterEvent})
    }
    let letterPrint = letter
    if(letterPrint == '1')letterPrint='⌫' 
    if(letterPrint == '2')letterPrint='↵'
    return (
        <div key={'keyboard-row-'+i+'-col-'+j} className='key-box' onClick={()=>{sendKeypress(letter)}}>
            {letterPrint}
        </div>
    )
}

export const Keyboard = ({weldorInstance}) => {
    const { 
        guessedWord, 
        guessedWordSet, 
        boxStatusSet, 
        activeBoxKey, 
        winConditionMet,
        loseConditionMet,
        handleUserInput
    } = weldorInstance

    const keys = ['QWERTYUIOP','ASDFGHJKL1','ZXCVBNM2']

    return (
        <>
            {Array.from({ length: 3 }, (_, i) => (
                <div key={'keyboard-row-'+i} className="container">
                    {Array.from({ length: keys[i].length}, (_, j) => (
                        <KeyButton i={i} j={j} letter={keys[i][j]} handleUserInput={handleUserInput}></KeyButton>
                    ))}
                </div>
            ))}
        </>
    )
}