import { useEffect, useState } from "react";
import { TodoProvider } from "./context";
import { TodoForm, TodoItem } from "./components";
import axios from "axios";
import MAIN_BACKEND_URL from "./config/api";

function App() {
  const [ todos, setTodos ] = useState([]);
  
  
  const fetchAllTodos =  async () => {
    try {
      const response = await axios.get(MAIN_BACKEND_URL + "todos/")
      const data = await response.data;
      console.log(data)
      setTodos([...data.todos].reverse()); // Create a copy of the array before reversing it
      // setTodos(data.todos)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllTodos()
  }, [])
  

  const addTodo = async (todo) => {
    try {
      await axios.post(MAIN_BACKEND_URL + "todos/", {
        text: todo
      }) 
    } catch (error) {
      console.log(error)
    }
    fetchAllTodos()
    // setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };
  const updateTodo = async (id, updatedTodo) => {
   try {
       await axios.put(MAIN_BACKEND_URL + "todos/", {
        id: id,
        text: updatedTodo
      }) 
    } catch (error) {
      console.log(error)
    }
    fetchAllTodos()
  };
  const deleteTodo = async (id) => {
    console.log(id)
     try {
      await axios.delete(MAIN_BACKEND_URL + "todos/", {
        data : {id: id}
      }) 
    } catch (error) {
      console.log(error)
    }
    fetchAllTodos()

  };
  const toggleComplete = async (id) => {
     try {
       await axios.put(MAIN_BACKEND_URL + "todos/", {
        id: id,
        completed: true
      }) 
    } catch (error) {
      console.log(error)
    }
    fetchAllTodos()
  };

  
console.log(todos)
  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
