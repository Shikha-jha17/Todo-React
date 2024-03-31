import { useState, useEffect } from 'react'

import { v4 as uuidv4 } from 'uuid';
import { IoIosFlag } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() { 

  const [todo, setTodo] = useState([])

  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  


  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    saveToLS()
  }
  
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  const importantTodo = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, important: !todo.important };
        }
        return todo;
      });

      return updatedTodos.sort((a, b) => (b.important ? 1 : -1));
    });
  };
  

  return (
    < >
    
       <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-gray-100 shadow-lg  min-h-[80vh] md:w-[35%]">
        <div className='bg-green-300 shadow-lg  p-2 rounded-xl' >
        <h1 className='font-bold text-center text-3xl text-cyan-900  '>TO DO LIST</h1>
        </div>
        
         <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold text-cyan-900 '>Add a Todo</h2>
          <div className="flex">

          <input  onChange={handleChange}  value={todo}  type="text" maxLength={40} className='w-full rounded-md px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-cyan-900 mx-2 rounded-md shadow-lg disabled:bg-gray-300 p-4 py-2 text-sm font-bold text-white'>Add</button>
          </div>
         </div>
         <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label className='mx-2 text-cyan-900 text-xl font-bold ' htmlFor="show">Show Finished</label> 
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
         <h2 className='text-2xl font-bold text-cyan-900 '>Your Todos</h2>
         <div className="todos">
          {todos.length ===0 && <div className='m-5 text-cyan-900 '>No Todos to display</div> }
          {todos.map(item=>{
 
          return (showFinished || !item.isCompleted) && <div key={item.id} className={`todo flex my-3 justify-between text-black ${item.important ? 'bg-red-500 py-1 px-1 rounded-md' : ''}`}>
            <div className='flex gap-5'> 
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
            <button onClick={() => importantTodo(item.id)} className=" p-1 py-1 text-sm font-bold text-white rounded-md mx-1"><IoIosFlag className='fill-black' /></button>
            <button onClick={(e)=>handleEdit(e, item.id)} className=' p-1 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit className='fill-black'/></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className=' p-1 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete className='fill-black'/></button>
            </div> 
          </div>
          })}
         </div>
        
       </div>
    </>
  )
}

export default App