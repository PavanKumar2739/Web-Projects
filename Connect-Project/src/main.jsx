import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PostListProvider from './store/posts-list-store.jsx'
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import PostLists from './components/create_req/PostList.jsx'
import CreatePost from './components/create_req/create-post.jsx'
import Login from './pages/Login.jsx'

const router = createBrowserRouter([
 {
    path:'/',
    element: <Home/>,
    childern:[
    
     {path :"home", element:<PostLists/>, loader:()=>{}},
     {path :"create-posts", element:<CreatePost/>}
    ]

  },{
   
    element: <Login/>,
    childern:[
      {
        path: "login",
        element: <Login />,
       // loader: ProtectedRoute,
      },
    ]
  }
]);

const ProtectedRoute = (event)=>{
  return sessionStorage.getItem('isUserLogin')?<Navigate to ='/'/>:<Navigate to ="/login"/>
}

const LoginRoute=(event)=>{
  return sessionStorage.getItem('isUserLogin')? <Navigate to ='/'/>:<div><Outlet/></div>;
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <PostListProvider>
  <React.StrictMode>
    {/* <RouterProvider router={router}/> */}
   <App/>
  </React.StrictMode>
  </PostListProvider>
)
