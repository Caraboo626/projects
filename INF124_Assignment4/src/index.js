import React from 'react';
import mongoose from 'mongoose';
import cors from 'cors';
import OpenAI from 'openai';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import HomePage from './web_pages/HomePage';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;


const router = createBrowserRouter([
  {
  path: "/",
  element: <HomePage />,
  children:[ 
    {
    path: "/HomePage",
    element: <HomePage />
    },
 ]
}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
