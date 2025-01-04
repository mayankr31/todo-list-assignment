import { createContext, useContext } from "react";

//creating context to hold todo data and functions
export const TodoContext = createContext({
    //default context values with sample data and functions
    todos: [{
        id: 1,
        title: "Create a new todo",
        description: "Create a new todo item",
        completed: false,
    }],
    addTodo: (todo) => {},
    editTodo: (id, todo) => {},
    deleteTodo: (id) => {},   
});

//custom hook to use todo context
export const useTodo = ()=>useContext(TodoContext);

// Export the provider component to wrap parts of the app that need access to TodoContext
export const TodoProvider = TodoContext.Provider;