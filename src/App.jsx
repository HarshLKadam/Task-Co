import { useState,useEffect } from 'react'
import Navbar from './componenets/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, settodo] = useState("")
  const [todo2, settodo2] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todostring=localStorage.getItem("todo2")
    if(todostring){
      let todo2=JSON.parse(localStorage.getItem("todo2"))
      settodo2(todo2)
    }
  }, [])

  const savetols=()=>{
    localStorage.setItem("todo2",JSON.stringify(todo2))
  }

  const togglefinished=(e)=>{
     setshowfinished(!showfinished)
  }

  const handeledit = (e,id) => {
   let t= todo2.filter(i=> i.id ==id )
    settodo(t[0].todo);
    let newtodo = todo2.filter(item => {
      return item.id !== id;
    })
    settodo2(newtodo);
    savetols()
  }

  const handeldelete = (e, id) => {
    console.log(`the id is ${id}`);
    let index = todo2.findIndex(item => {
      return item.id == id;
    })
    console.log(index)
    let newtodo = todo2.filter(item => {
      return item.id !== id;
    })
    settodo2(newtodo);
    savetols()
  }

  const handeladd = () => {
    settodo2([...todo2, { id: uuidv4(), todo, isCompleted: false }]);
    settodo(" ")
    console.log(todo2)
    savetols()
  }

  const handelchange = (e) => {
    settodo(e.target.value)
  }

  const handelcheckbox = (e) => {
    let id = e.target.name;
    console.log(`the id is ${id}`)
    let index = todo2.findIndex(item => {
      return item.id == id;
    })
    console.log(index)
    let newtodo = [...todo2];
    newtodo[index].isCompleted = !newtodo[index].isCompleted;
    settodo2(newtodo)
    console.log(newtodo)
    savetols()
    
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-2xl bg-violet-200 p-5 min-h-[80vh] w-[90vw]">
      <h1 className='font-bold text-xl text-center'>Task-Co </h1> <p className='text-center'> Manage your all tasks at one place</p>
        <div className="addtodo my-5 flex flex-col">
          <h1 className='text-xl font-bold'>Add Your Todos </h1>
        
        <input onChange={handelchange} value={todo} type="text" className='w-full p-2 rounded-full my-2' placeholder='Task-Co - add your task here '/>
        <button onClick={handeladd} disabled={todo.length<3} className='bg-violet-500 hover:bg-violet-900 p-2  px-4 rounded-full m-2 text-white hover:font-bold '>
          Add Task
        </button>
        </div>
        <input type="checkbox" onChange={togglefinished} checked={showfinished} className=''/> Show Finished Task 
        <h1 className='text-xl font-bold my-4'>Your Todos</h1>
        <div className="todos">
          {todo2.length == 0 && <div className='m-5 text-2xl'>No Todos to Display now</div>}
          {todo2.map(item => {


            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-5 justify-between">
              <div className='flex gap-5'>
                <input onChange={handelcheckbox} type="checkbox" checked={item.isCompleted} id="" name={item.id} />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo} </div>
              </div>

              <div className="btns flex  h-full ">
                <button onClick={(e)=>{handeledit(e,item.id)} } className='bg-violet-500 hover:bg-violet-900 p-2 text-sm rounded-lg mx-1 text-white hover:font-bold'><FaEdit /></button>
                <button onClick={(e) => { handeldelete(e, item.id) }} className='bg-violet-500 hover:bg-violet-900 p-2 text-sm rounded-lg mx-1 text-white hover:font-bold'><MdDelete /></button>
              </div>
            </div>

          })}
        </div>
      </div>

    </>
  )
}

export default App
