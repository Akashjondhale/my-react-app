import  { useEffect } from 'react'

export const Task8_UseEffect = () => {
    useEffect(() => {
        console.log("componet is loaded ");
    },[]);

  return (
    <div>Check Console</div>
  )
}
