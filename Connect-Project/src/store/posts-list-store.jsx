import { createContext, useCallback, useMemo, useReducer, useRef, useState } from "react";
import { ServiceRequest } from "../apis/serviceReq";

export const PostList = createContext({
    username:'',
    postList:[],
    isDelete:false, 
    addPost:()=>{},
    deletePost:()=>{ },
    confirmDelete:()=>{},
    fetchPost:()=>{},
    isSpinner:false,
    setSpinner:()=>{}
});



const postListReducer = (currentPostList, action) => {
  let newPostList = currentPostList;

  if (action.type === 'DELETE_POST') {
    newPostList = currentPostList.filter((obj) => obj.post_id !== action.payload.postId);
  } else if (action.type === 'ADD_POST') {
    newPostList = [action.payload, ...currentPostList];
  } else if (action.type === 'FETCH_POSTS') {
    const uniqueFetchedPosts = action.payload.filter(
      (fetchedPost) => !currentPostList.some((post) => post.post_id === fetchedPost.post_id)
    );
    newPostList = [...uniqueFetchedPosts, ...currentPostList];
  }
  

  return newPostList.slice(); // Creating a new array to ensure immutability
};

const spinnerReducer = (current, action) => {
    switch (action.type) {
      case 'SPINNER': {
        return action.payload;
      }
      default: {
        return current;
      }
    }
  };
  

const PostListProvider = ({children})=>{
    const [postList,dispatchPostList] = useReducer(postListReducer,DEFAULT_POST_LIST);
    const [isSpinner,dispatchSpinner] = useReducer(spinnerReducer,false)
    const[isDelete,setIsDelete] = useState(false);
    const username = sessionStorage.getItem('username');
    const addPost =(post_id,image,postTittle,postBody,reactions,tags,userid)=>{
        dispatchPostList({
            type:'ADD_POST',
            payload:{
                    post_id:post_id,
                    image:image,
                    title:postTittle,
                    body:postBody,
                    reactions:reactions,
                    userId:userid,
                    tags:tags        
            }
        })
    }
    const fetchPost=(posts)=>{
        console.log(posts)
        try{
        dispatchPostList({
            type:'FETCH_POSTS',
            payload:posts,
        })
    }catch(e){
        console.error('Error fetching posts:', e);
    }
    }
    //useCallback simple ex:
    const deletePost =useCallback((postId)=>{
    
      dispatchPostList({
        type : 'DELETE_POST',
        payload:{
            postId,
        }
      })
      
    },[dispatchPostList]);

    //useMemo simple example:
    // let arr = [3,4,35,6,7,8];
    // const sortedArr = useMemo(()=>arr.sort(),[arr])// tellig like when ever the arr changes than only entire function reexecute else it will not.

    const setSpinner = (bool) => {
        try{
            console.log("Before dispatching SPINNER", bool);
            dispatchSpinner({
                type: 'SPINNER',
                payload: bool,
            });
            console.log("After dispatching SPINNER", bool);
    }
    catch(e){
        console.log(e)
    }
      };
      
    const confirmDelete=(bool)=>{
        console.log(isDelete)
        setIsDelete(bool)
        console.log(isDelete);
    }

    return(
        <PostList.Provider value={{
            username,
            postList,
            isSpinner,
            addPost,
            deletePost,
            isDelete,
            confirmDelete,
            fetchPost,
            setSpinner,
        }}>
            {children}
        </PostList.Provider>
    );
}

export default PostListProvider;

const DEFAULT_POST_LIST=[
    {
        post_id:'1',
        image:'images/BangalorePalace.jpg',
        title:'Bangalore palace',
        body:'Such a nice weather at bangalore',
        reactions:50,
        userId:'admin',
        tags:['#vacation','#bagalore','#software','#surprice']
    
    },
   
{
    post_id:'2',
    image:'images/Screenshot 2024-01-28 112652.png',
    title:'Happy I got job',
    body:'Afer a log hard work i got my dream job',
    reactions:10,
    userId:'admin',
    tags:['#job','#hardwork','#software']
},
{
    post_id:'3',
    image:'connect\\public\\images\\Screenshot 2024-01-28 112652.png',
    title:'Going to mumbai',
    body:'Hi friends i am going to mumbai for vacations',
    reactions:2,
    userId:'admin1',
    tags:['#vacation','#mumbai','#enjoying']
},

];