const multer = require('multer');

const path = require('path')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'assets/postImages')//error occur ,actual destination
    },
    filename:(req,file,cb)=>{//file name to be stored 
        const fileName = (Date.now()+"_"+ file.originalname);
        console.log('Uploaded file name:', fileName);
        cb(null, fileName);
    }
})

const upload = multer({storage:storage});

upload.getUploadedFilePath = (fileName) => {
    return path.join('server/assets/postImages/', fileName);
};

module.exports=upload;
