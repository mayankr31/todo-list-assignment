import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodo } from "../context/TodoContext";

export default function EditTaskPage(props) {
  const { id } = useParams(); //get the task id from the URL parameters
  const [title, setTitle] = useState(""); //state for task title
  const [description, setDescription] = useState(""); //state for task description
  const [completed, setCompleted] = useState(false); //state for task completion status
  const { todos, editTodo } = useTodo(); //access the editTodo function and todos from the context
  const navigate = useNavigate(); //hook for navigation

  // Fetch the existing task data by id when the component loads or when the todos change
  useEffect(() => {
    const todo = todos.find((t) => t.id === parseInt(id));

    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setCompleted(todo.completed);
    }
  }, [id, todos]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Call the editTodo function with the updated task's data
    editTodo(parseInt(id), {
      title,
      description,
      completed,
    });

    navigate("/"); // Navigate back to the HomePage after editing the tas
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Edit Task</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 text-start"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 text-gray-700 block w-full rounded-md px-2 py-0.5 border-gray-300 shadow-sm"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 text-start"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md px-2 py-0.5 border-gray-300 shadow-sm text-gray-700"
            placeholder="Enter task description"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="completed"
            className="block text-sm font-medium text-gray-700 text-start"
          >
            <input
              type="checkbox"
              id="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="mr-2 rounded"
            />
            Completed
          </label>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded-lg shadow-lg"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}
