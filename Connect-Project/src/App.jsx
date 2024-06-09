import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useContext, useEffect } from "react";
import {PostList } from "./store/posts-list-store";
import Spinner from "./components/loading/spinner";
import CreatePost from "./components/create_req/create-post";
import PostLists from "./components/create_req/PostList";
import UnderDevelopmentPage from "./components/page-under-dev";


const App=()=>{
  const { isSpinner} = useContext(PostList);
  

  useEffect(()=>{

  },[]);

  return(
    <BrowserRouter>
    {/* {isSpinner&&<Spinner/>} */}
    <Routes>
      <Route path="/" element={<Navigate to='/home' replace={true}/>}/>
      <Route path="/login" element={<LoginRoute><Login/></LoginRoute>}/>
      <Route path="/home" element = {<ProtectedRoute><Home><PostLists/></Home></ProtectedRoute>} />
      <Route path="/create-posts" element = {<ProtectedRoute><Home><CreatePost/></Home></ProtectedRoute>}/>
      <Route path="/under-development" element = {<ProtectedRoute><Home><UnderDevelopmentPage/></Home></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
  )
}

const ProtectedRoute = (event)=>{
    return sessionStorage.getItem('isUserLogin')?event.children:<Navigate to ="/login"/>
}
const LoginRoute=(event)=>{
  return sessionStorage.getItem('isUserLogin')? <Navigate to ='/'/>:event.children;
}

const loadPosts=async ()=>{
  return await ServiceRequest.callAPI("/allPosts", {  });
}


export default App;
