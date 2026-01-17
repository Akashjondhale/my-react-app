
export const Task7_List = () => {
    const name=["AJ", "DJ" , "MJ"];
  return (
    <>
    <h1>List</h1>
    <ul> {name.map(name=> (<li key={name}> {name} </li>))} </ul>
    </>
  )
}


export default Task7_List;