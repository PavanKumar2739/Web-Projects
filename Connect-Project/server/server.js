const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
require('dotenv').config();

const server = http.createServer(app);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors());
app.use(express.json({ limit: '100mb' })); // Adjust the limit accordingly

const multer = require('multer');

const path = require('path')

const storage = multer.diskStorage({
    destination:function (req,file,cb){
        console.log('fsadfds')
        cb(null,"./assets/")//error occur ,actual destination
    },
    filename:function(req,file,cb){//file name to be stored 
        console.log(file);
        cb(null,path.extname(file.originalname)+Date.now())
    }
})

const upload = multer({storage:storage});

const login = require('./routers/login');
const userActivity = require('./routers/userActivity');


app.use('/api/',login);
app.use('/api/', userActivity);

// app.post('/api/upload',upload.single("image"),(req,res)=>{
//     try {
//         console.log('Uploaded successfully');
//         res.status(200).send('Uploaded successfully');
//     } catch (error) {
//         console.error('Error handling file upload:', error);
//         res.status(500).send('Internal Server Error');
//     }
// })

const port = process.env.PORT||'4000';

app.set('port',port);

server.listen(port,'0.0.0.0',()=>{console.log(`Server started at : ${port}`)})


