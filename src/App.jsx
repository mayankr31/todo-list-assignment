import { Outlet } from "react-router-dom";
import { TodoProvider } from "./context/TodoContext";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  //function to add a new todo
  const addTodo = async (todo) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          body: JSON.stringify(todo),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      //throw an error if the response is not ok
      if (!response.ok) {
        throw new Error(`Failed to add todo. Status: ${response.status}`);
      }

      const newTodo = await response.json();

      //add the new todo to the state
      setTodos((prevTodos) => [
        ...prevTodos,
        { ...newTodo, description: todo.description },
      ]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  //function to edit an existing todo
  const editTodo = async (id, newtodo) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(newtodo),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const updatedTodo = await response.json();

      //update the specific todo in the state
      setTodos(
        todos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                ...updatedTodo,
                description: newtodo.description || todo.description,
              }
            : todo
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  //function to delete a todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );

      //throw an error if the response is not ok
      if (!response.ok) {
        throw new Error(`Failed to delete task with id ${id}`);
      }

      //remove the todo from the state
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  //function to fetch todos from the API
  const fetchTodos = async () => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=20"
      );
      const data = await res.json();

      //add a description field to the todos if it doesn't exist
      const todosWithDescription = data.map((todo) => ({
        ...todo,
        description: todo.description
          ? todo.description
          : "No description provided",
      }));

      setTodos(todosWithDescription);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos(); //fetch todos when the component mounts
  }, []);

  return (
    //pass the todos and the functions to the context provider
    <TodoProvider value={{ todos, deleteTodo, addTodo, editTodo }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-4xl font-bold text-center mb-8 mt-2">
            Todo List
          </h1>
          <Outlet /> {/* render the child routes */}
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
