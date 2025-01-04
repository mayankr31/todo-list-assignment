import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { useNavigate } from "react-router-dom";

export default function AddTaskPage(props) {
  const [title, setTitle] = useState(''); //state for task title
  const [description, setDescription] = useState(''); //state for task description
  const {addTodo} = useTodo(); //access the addTodo function from the context
  const navigate = useNavigate(); //hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent the default form submission

    //call the addTodo function with new task details
    addTodo({
      title,
      description,
      completed: false,
    });

    navigate('/'); //navigate back to the home page
  }

  return (
      <div className="bg-white shadow-lg rounded-lg p-6 w-full">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Add New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 text-start">
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 text-start">
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
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded-lg shadow-lg"
          >
            Add Task
          </button>
        </form>
      </div>
  );
}
