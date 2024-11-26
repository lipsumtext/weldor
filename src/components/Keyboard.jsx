import { useEffect } from "react"
import { useWeldor } from "../hooks/useWeldor"
import './WordGrid.styles.css'

export const KeyButton = ({i,j,letter,handleUserInput}) => {
    const sendKeypress = (letter) => {
        let keyy = letter
        if(keyy == '1')keyy='Backspace'
        if(keyy == '2')keyy='Enter'
        // console.log(keyy)
        handleUserInput({key:keyy})
    }
    let print = letter
    if(print == '1')print='⌫' 
    if(print == '2')print='↵'
    return (
        <div key={'keyboard-row-'+i+'-col-'+j} className='key-box' onClick={()=>{sendKeypress(letter)}}>
            {print}
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