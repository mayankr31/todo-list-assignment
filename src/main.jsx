import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import EditTaskPage from './pages/EditTaskPage.jsx';
import AddTaskPage from './pages/AddTaskPage.jsx';

//Define the routes for the application
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path="" element={<HomePage/>}/>
      <Route path="edit/:id" element={<EditTaskPage/>}/>
      <Route path="add" element={<AddTaskPage/>}/>
    </Route>
  )
);

//Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
