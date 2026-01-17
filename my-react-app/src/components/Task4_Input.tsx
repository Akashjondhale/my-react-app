import  { useState } from 'react'

export const Task4_Input = () => {
    const[text , settext]= useState("");

  return (
    <>
    <input onChange={e => settext(e.target.value)} />
    
    <p>you typed : {text}</p>
    </>
  )
}

export default Task4_Input;