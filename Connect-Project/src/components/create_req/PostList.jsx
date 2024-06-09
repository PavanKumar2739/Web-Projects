import { useContext, useEffect } from "react"
import Post from "./Post"
import {PostList as PostListData} from "../../store/posts-list-store"
import DeletPostConfirm from "./deletPostConfirm"
import Welcomemessage from "./welcomemessage"
import { IoIosRefresh } from "react-icons/io";
import Spinner from "../loading/spinner"
import { useLoaderData } from "react-router-dom"

const PostLists = () => {
  const {postList,isDelete,fetchPost,isSpinner,setSpinner}= useContext(PostListData);
  //const rest = useLoaderData();// having some trouble we will use later
  // useEffect(()=>{
  //  // setSpinner(true);
  //   console.log('spinner')
  //   if(results.length>0){
  //   fetchPost(results);
    
  //   }
  // },[])
  async function onHomeLoad(signal) {
    try {
      setSpinner(true);
      console.log("fetch started");
      
      const results = await ServiceRequest.callAPI("/allPosts", {  });
      if (results.length > 0) {
        console.log("fetch came");
        results.forEach((result) => {
          const tags = result.tags;
          result.tags = splitTags(tags);
          setResult((res) => [result, ...res]);
        });

        fetchPost(results);

        console.log("fetch middle" + isSpinner);
      } else {
        setResult({});
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setSpinner(false);
      console.log("fetch ended" + isSpinner);
    }
  }
  const onDataFetch = () => {
    onHomeLoad();
    console.log("posts");
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then(console.log);
  };
  
  return (
    <>
    {isDelete && <DeletPostConfirm setIsDelete={() => { }} />}
    {isSpinner&&<Spinner/>}

     {postList.map((obj)=> <Post key={obj.post_id} post={obj}/>)}
     <button
              onClick={(e) => onDataFetch()}
              type="button"
              class="btn btn-primary d-flex align-items-center mx-auto"
              style={{ gap: "5px" }}
            >
              <IoIosRefresh />
              Refresh Page
            </button>
     {/* {fetchPost(results)} */}
    </>
  )
}

export default PostLists
