import React, { useCallback, useContext, useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { ServiceRequest } from '../apis/serviceReq';
//require('dotenv').config();


const Login = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });


    const handleOnSubmit = async(e) => {
        e.preventDefault();

       const res= await ServiceRequest.callAPI('/login',{userData})
       
       try{
                console.log(res);
            if(res&&res.length>0){
                sessionStorage.setItem("isUserLogin", true);
                sessionStorage.setItem("username",res[0].username);
                navigate('/');
            }else{
                alert('Username or Password is incorrect');
            }
    
            }catch(e){
                console.log(e);
            }
        
        // axios.post(`${}/login`, { userData }).then((res) => {
        //     console.log(res);
        // if(res.data&&res.data.length>0){
        //     sessionStorage.setItem("isUserLogin", true);
        //     navigate('/');
        // }else{
        //     alert('Username or Password is incorrect');
        // }

        // }).catch((e) => {
        //     console.log(e);
        // });

    }
    const onChange=(e)=>{
        setUserData({...userData,[e.target.name]:e.target.value})
    }
    const {username,password}=userData;

    return (
        <div>
            <center><h1>Login</h1></center>
            <div className='leftContainer'>

            </div>
            <div className='rightContainer'>
                <form onSubmit={handleOnSubmit} >
                    <center>
                        <input type='text' placeholder='Name' value={username} name='username' onChange={onChange} /><br />
                        <input type='password' placeholder='Email' value={password} name='password' onChange={onChange} /><br />
                        <input type='submit' name='Login' />
                    </center>
                </form>
            </div>

        </div>
    )
}

export default Login;
