import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiFileAddFill } from "react-icons/ri";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    console.log("hello")
    let todosString = localStorage.getItem("todos");
    console.log("from local: ", JSON.parse(todosString));
    if (todosString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  
  const saveToLocalStorage = () => {
    console.log(todos)
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  
  useEffect(() => {
    saveToLocalStorage();
  }, [todos])

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  }

  const handleEdit = (event, id) => {
    let t = todos.find((item) => item.id === id);
    setTodo(t.todo);

    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (event, id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleCheckbox = (event) => {
    let id = event.target.name;

    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <div>
      <Navbar />
      <div className="todo-body container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] lg:w-1/2 md:w-3/4 sm:w-full">
        <h1 className="font-bold text-center text-xl">Manage you Todos</h1>
        <div className="addTodo  my-5">
          <h2 className="text-lg font-bold my-2">Add a Todo</h2>
          
          <div className="flex gap-2">
            <input onChange={handleChange} value={todo} type="text" className=" w-3/4 px-3 rounded-lg py-1"
            />
            <button onClick={handleAdd} disabled={todo.length <= 3} className="mx-4 text-lg py-2 disabled:bg-violet-500 duration-300">
            <RiFileAddFill />
            </button>
          </div>

        </div>
        <input type="checkbox" onChange={toggleFinished} className="cursor-pointer" checked={showFinished} name="" id="showfinished" /> <label className="mx-3 cursor-pointer" for="showfinished">Show Finished</label>
        <h2 className="text-lg font-bold my-4">Your TODOs</h2>

        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5">No Todos to display.</div>
          )}
          {todos.map((item) => {
            return ( (showFinished || !item.isCompleted) &&
              <div key={item.id} className="todo flex lg:w-2/3 sm:w-4/5 md:w-2/3 my-3 justify-between">
                <div className="flex gap-5">
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                    id=""
                  />
                  <div className={!item.isCompleted ? "" : "line-through"}>
                    {item.todo}
                  </div>
                </div>

                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className="mx-1">
                  <FaRegEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="mx-1"
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
