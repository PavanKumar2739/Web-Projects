import { useContext, useState } from "react";
import { PostList } from "../../store/posts-list-store";
import { HiUserCircle } from "react-icons/hi2";

const SideBar = ({selectedTab,setSelectedTab})=>{
  const[show,setShow] = useState(false);
  const { username } = useContext(PostList);
  const handleOnClick=(tabName)=>{
    setSelectedTab(tabName);
    //setShow(show);

  }
 
  function userHandle(e){
      setShow(!show);
  }
 
    return(
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sideBar" style={{width: "180px"}}>
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
      <span className="fs-4">Connect</span>
    </a>
    <hr/>
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item" onClick={(e)=>{handleOnClick('Home')}}>
        <a href="/home" className={`nav-link text-white ${selectedTab=='Home'&& 'active'}`} aria-current="page">
          <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
          Home
        </a>
      </li>
      <li className="nav-item" onClick={(e)=>{handleOnClick('Create Post')}}>
          <a href="/create-posts" className={`nav-link text-white ${selectedTab=='Create Post'&& 'active'}`}>
          <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
          Create Post
        </a>
      </li>
      
    </ul>
    <hr/>
    <div className="dropdown">
      <div style={{cursor:"pointer"}}  className={`d-flex align-items-center text-white text-decoration-none dropdown-toggle ${show?"show":""}`} data-bs-toggle="dropdown" aria-expanded={show}  onClick={userHandle}>
        {false?<img src="" alt="" width="32" height="32" className="rounded-circle me-2"/>:<div  style={{ margin: '10px' }} ><HiUserCircle size={30} /></div>}
        <strong>{username}</strong>
      </div>
      <ul class={`dropdown-menu dropdown-menu-dark text-small shadow ${show?"show":""}`}  style={show?{position: "absolute", inset:"auto auto 0px 0px", margin: "0px", transform: "translate3d(0px, -33.6px, 0px)"}:{}} data-popper-placement="top-start">
        <li><a class="dropdown-item" href="/under-development">Settings</a></li>
        <li><a class="dropdown-item" href="/under-development">Profile</a></li>
        <li><hr class="dropdown-divider"/></li>
        <li><a class="dropdown-item" href="/login" onClick={(e)=>sessionStorage.clear()}>Sign out</a></li>
      </ul>
    </div>
  </div>
    );
}

export default SideBar;