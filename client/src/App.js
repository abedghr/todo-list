import { useEffect,  useState } from "react";
import "./App.css";
import { createTodo, deleteTodo, readTodo, updateTodo, updateTodoIsDone } from "./functions/todoFunctions.js";

function App() {
  
  const [allTodos, setAllTodos] = useState(null)
  const [todo, setTodo] = useState({phone:'', title:'', content:''});
  const [is_done, setIsDone] = useState({is_done:''});
  const [currectId, setCurrentId] = useState(0);
  const [currectIsDoneId, setCurrectIsDoneId] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodo();
      setAllTodos(result);
      console.log(allTodos);
    }
    fetchData()
  }, [currectId, is_done, currectIsDoneId])


  useEffect(() => {
    let currentTodo = currectId != 0 ? allTodos.find(todo => todo._id === currectId) : {phone:'',title:'',content:''};
    setTodo(currentTodo);
  }, [currectId])

  const removeTodo = async (id) => {
    await deleteTodo(id);
    const newTodo = [...allTodos];
    newTodo.filter(todo => todo._id !== id);
    setAllTodos(newTodo);
    clear()
  }

  const updateIsDone = async (id, is_done) => {
    console.log(id, is_done)
    setCurrectIsDoneId(id);
    if(id != 0) {
      await updateTodoIsDone(id, is_done)
      setIsDone(is_done);
    }
    clear();
  } 


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if(todo.phone != '' && todo.title != '' && todo.content != '' ) {
      if(currectId == 0) {
        const result = await createTodo(todo);
        setAllTodos([result].concat(allTodos));
        clear();
      } else {
        await updateTodo(currectId,todo)
        clear()
      }
    } else {
      alert("All Fields are Required");
    }

  }

  const clear = () => {
    setCurrentId(0)
    setTodo({phone:'', title:'', content:''});
  }

  return (
    <div className="App mt-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sider">

                <div className="dots">
                  <div className="dot1"></div>
                  <div className="dot2"></div>
                  <div className="dot3"></div>
                </div>
              
                <div className="my-name">
                  <h1 className="text-light mt-2">Your Todo List</h1>
                </div>

                <div className="incomplete-task-up">
                  <div className="incomplete-task">
                  <pre>{JSON.stringify(todo)}</pre>

                  <form onSubmit={onSubmitHandler}>
                      <input type="text" name="phone" value={todo.phone} className="w-100" placeholder="phone" onChange = {e => setTodo({...todo, phone:e.target.value})}/>
                      <input type="text" name="title" value={todo.title} className="w-100" placeholder="title" onChange = {e => setTodo({...todo, title:e.target.value})}/>
                      <input type="text" name="content" value={todo.content} className="w-100" placeholder="content" onChange = {e => setTodo({...todo, content:e.target.value})}/>
                      <div className="new-task-button w-100">
                        <button className="btn btn-lg">Add Task</button>
                      </div>
                    </form>

                  </div>
                </div>

                <hr/>
                <div className="uppertaskarea m-5">
                  <div className="taskarea">
                    
                   
                   { 
                   !allTodos ? "" : allTodos.length > 0 ? 
                   <div>
                     {allTodos.map(todo => (
                          <div key={todo._id} className="tasks">
                            <ul className="text-light list-group" >
                              {  
                                todo.is_done != 1 ? "" : 
                                <li className="doneColor font-weight-bold shadow-lg ">Done</li>
                              }
                              <li className={todo.is_done == 1 ? "doneTodo" : ''}><h3>{todo.title}</h3></li>
                              <li className={todo.is_done == 1 ? "doneTodo" : ''}><p>{todo.content}</p></li>
                            </ul>
                            <div className="task-update-delete">
                              
                              <div className="done">
                                <a href="#!"  onClick={() => updateIsDone(todo._id, todo.is_done == 0 ? 1 : 0)}>
                                  <i className="fas fa-check-square"></i>
                                </a>
                              </div>
                            
                              <div className="update" onClick={() => setCurrentId(todo._id)}>
                                <a href="#!">
                                  <i className="fas fa-pen-square"></i>
                                </a>
                              </div>

                              <div className="delete" onClick={() => setCurrentId(todo._id)}>
                                <a href="#!" onClick={() => removeTodo(todo._id)}>
                                  <i className="fas fa-times-circle"></i>
                                </a>
                              </div>
      
                            </div>
                          </div>
                     ))}
                    </div> : <h5 className="text-light">Nothing Todo</h5>
                   }
                  </div>
                </div>
            </div>
          </div>
        </div>
       
      </div>  
    </div>
  );
}

export default App;
