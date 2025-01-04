import React from 'react'
import { Link } from 'react-router-dom'
import { useTodo } from '../context/TodoContext';

export default function TodoItem({todo}) {
    
    const {deleteTodo} = useTodo();  //access the deleteTodo function from the context

    return (
        <div className='space-y-4'>
            <div className='bg-white shadow-md rounded-lg p-4'>
                <h2 className='text-xl font-semibold text-black'>{todo.title}</h2>
                <p className='text-gray-600'>{todo.description}</p>
                
                <span className='text-sm text-gray-600'>Status: </span>
                <p className={`text-sm inline mt-2 ${todo.completed ? "text-green-500" : "text-red-600"}`}>{`${todo.completed ? "completed": "pending"}`}</p>
                
                <div className='mt-4 space-x-2'>
                    <Link to={`/edit/${todo.id}`} className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded-lg'>Edit</Link>
                    <button onClick={()=>deleteTodo(todo.id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-2 rounded-lg'>Delete</button>
                </div>
            </div>
        </div>
    )
}
