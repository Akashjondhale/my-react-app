import { useState } from "react";

const Task3_Hello =() =>{

    const[count, setcount]= useState(0);
    return (
        <>
        <p> count = {count}</p>
        <button onClick={()=> setcount(count +1)}> Click Me</button>
        <button onClick={ count> 0 ? ()=> setcount(count - 1) : undefined}> Decrement</button>
        </>
    );
}
export default Task3_Hello;