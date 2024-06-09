import { useContext, useState } from "react";
import "./createReq.css";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { PostList } from "../../store/posts-list-store";
import DeletPostConfirm from "./deletPostConfirm";
import post from '../../../server/assets/postImages/1708191085562_Learn Java from Scratch.png'
const Post = ({ post }) => {
  const {deletePost,confirmDelete,setSpinner} = useContext(PostList);
  

  const deletePostConfirm=(postId)=>{
   // confirmDelete(true);
     deletePost(postId);
    
  }

  return (
    <>
     
      <div className="card post-card" style={{}} >
      <img src={'../../../'+post.image} className="card-img-top" alt="image"/>
     
        <div className="card-body" >
        {/* <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        <FiSend size={10} />
                
        </span> */}
        <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger"
        onClick={(e)=>deletePostConfirm(post.post_id)}>
          <MdDeleteForever/>
                
        </span>
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.body}</p>
          <div className="community-bar">
            
            <div style={{cursor:'pointer'}}>
            <span className="position-absolute badge rounded-pill bg-primary badge-position">
                  {post.reactions}
                
                </span>
              <AiOutlineLike size={25}>
                
              </AiOutlineLike>
            </div>
            <div style={{margin:'0px 20px',cursor:'pointer'}}>
              <FaRegComment size={25} />
            </div>
            <div style={{marginLeft:'',cursor:'pointer'}}>
              <FiSend size={25} />
            </div>
          </div >
          {post.tags.map((tag) => (
            <span className="hashTag" key={tag}>{`${tag}`}</span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Post;
