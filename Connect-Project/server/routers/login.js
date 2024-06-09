const express = require('express');
const { executeQuery } = require('../database/queryFunc');
const { runSelectQuery } = require('../database/sqlLite/sqlLiteFun');
const router = express();

router.post('/login',async(req,res)=>{//http:localhost:4000/api/login
    try{
    const {username,password}=req.body.userData;
    console.log("hello world..!",req.body.userData);
    const query = `SELECT * FROM users where username=?`
   const user=await runSelectQuery(query,[username])
   console.log(user);
    res.send(user);
    }catch(e){
        console.log(e)
        res.sendStatus('400');
    }

});

module.exports = router;