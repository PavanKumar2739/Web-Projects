import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import './index.css'
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Bag from './routes/Bag.jsx'
import Home from './routes/home.jsx'
import store from './store/store.js'
import {Provider} from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
     path:'/',
     element: <App/>,
     children:[
      {path :"/", element:<Home/>, /*loader:()=>{}*/},
      {path :"/bag", element:<Bag/>}
     ]
 
   }
 ]);
 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
    <RouterProvider router = {router}/>
    </Provider>
  </React.StrictMode>,
)
