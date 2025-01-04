import React from "react";
import TodoItem from "../components/TodoItem";
import { useTodo } from "../context/TodoContext";
import {Link} from 'react-router-dom';

export default function HomePage(props) {
  // Get the todos from the context
  const { todos } = useTodo();

  return (
    <div className="flex flex-col items-center gap-3">
      {/*Link to navigate to the AddTaskPage */}
      <Link to="/add" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-16">Add New Task</Link>

      <div className="flex flex-wrap gap-y-3">
        {/*Render the TodoItem component for each todo */}
        {todos.map((todo) => (
          <div key={`task-${todo.id}-${todo.title}`} className="w-full">
            <TodoItem todo={todo} />
          </div>
        ))}
      </div>
    </div>
  );
}
