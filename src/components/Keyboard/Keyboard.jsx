import { useEffect } from "react"
import { useWeldor } from "../../hooks/useWeldor"
import './Keyboard.styles.css'

export const KeyButton = ({i,j,letter,handleUserInput,keyStatusSet}) => {
    const sendKeypress = (letter) => {
        let letterEvent = letter
        if(letterEvent == '1')letterEvent='Backspace'
        if(letterEvent == '2')letterEvent='Enter'
        handleUserInput({key:letterEvent})
    }
    let letterPrint = letter
    let styling = ''
    if(letterPrint == '1')letterPrint='⌫' 
    else if(letterPrint == '2')letterPrint='↵'
    else {
        let index = letterPrint.charCodeAt(0)-96
        if (index<0) index = letterPrint.charCodeAt(0)-64
        styling = keyStatusSet[index-1]
    }
    return (
        <div key={'keyboard-row-'+i+'-col-'+j} className={styling || 'key-box'} onClick={()=>{sendKeypress(letter)}} >
            {letterPrint}
        </div>
    )
}

export const Keyboard = ({weldorInstance}) => {
    const {
        keyStatusSet,
        handleUserInput
    } = weldorInstance

    const keys = ['QWERTYUIOP','ASDFGHJKL1','ZXCVBNM2']

    return (
        <>
            {Array.from({ length: 3 }, (_, i) => (
                <div key={'keyboard-row-'+i} className="keyboard-container">
                    {Array.from({ length: keys[i].length}, (_, j) => (
                        <KeyButton i={i} j={j} letter={keys[i][j]} handleUserInput={handleUserInput} keyStatusSet={keyStatusSet}></KeyButton>
                    ))}
                </div>
            ))}
        </>
    )
}