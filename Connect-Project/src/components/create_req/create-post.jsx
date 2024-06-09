import { useContext, useReducer, useRef, useState } from "react";
import { PostList } from "../../store/posts-list-store";
import UploadImage from "./uploadImage";
import { ServiceRequest } from "../../apis/serviceReq";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { splitTags } from "../../pages/Home";


const CreatePost = () => {
  const navigate = useNavigate();
  const {addPost} = useContext(PostList);
  const userIdElement = useRef();
  const postTittleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();
  
  const [image,setImage]=useState('');
  const [file, setFile] = useState();

  const handleSubmit=async(event)=>{
    event.preventDefault();//dont submit we do rest of the process
    const formData = new FormData();
    formData.append("image",file);
    const username = sessionStorage.getItem('username');
    
    const postTittle = postTittleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions1 = reactionsElement.current.value;
    const tagsText = tagsElement.current.value;
   
    postTittleElement.current.value = "";
    postBodyElement.current.value = '';
    tagsElement.current.value = '';
    setImage('');
    const tags = splitTags(tagsText);
    
    

    try {
      const res = await axios.post("http://localhost:4000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const payload={
        image:res.data.filePath,
        tittle:postTittle,
        body:postBody,
        reactions:reactions1,
        userId:username,
        tags:tagsText        
  }
     const post_id=await ServiceRequest.callAPI('/addPost',payload,{
        'Content-Type':'multipart/form-data',
    }).catch(e=>{
      alert('Failed to upload the image')
    });

      
      addPost(post_id,payload.image,payload.tittle,payload.body,payload.reactions,tags,payload.userId);
    
    alert('Post uploaded successfully..!')
    navigate("/");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to upload the image')
    }
    
    
  }
 
  return (
    <form className="crete-post-form" encType="multipart/form-data" onSubmit={(e)=>handleSubmit(e)}>
       <div className="mb-3">
        <UploadImage image={image} setImage={setImage} setFile={setFile}/>
      </div>
      <div className="mb-3">
        <label htmlFor="tittle" className="form-label">
         Post Tittle
        </label>
        <input
         ref={postTittleElement}
          type="text"
          className="form-control"
          id="tittle"
          placeholder="how are you today"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
         
        </label>
        <textarea
        ref={postBodyElement}
        rows='4'
          type="text"
          className="form-control"
          id="body"
          placeholder="something about the post"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
         Reactions
        </label>
        <input
          ref={reactionsElement}
          type="text"
          className="form-control"
          id="reactions"
          placeholder="how many people reacted to the post"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
         Enter your hashTags here
        </label>
        <input
          ref={tagsElement}
          type="text"
          className="form-control"
          id="tags"
          placeholder="how many people reacted to the post"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
export default CreatePost;

