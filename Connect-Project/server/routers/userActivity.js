const express = require('express');
const {
    runInsertQuery,
    runSelectQuery,
} = require("../database/sqlLite/sqlLiteFun");
const upload = require('../utilities/uploadImg');
const { generateImageId } = require('../utilities/userUtils');
const router = express();


router.post("/addPost",  async (req, res) => {
    
    const { image, tittle, body, reactions, userId, tags } = req.body;
    const post_id=await generateImageId(userId);
    const args = [post_id, image, tittle, body, reactions, userId, tags];
    
    const createQuery = `CREATE TABLE IF NOT EXISTS userposts (
        post_id TEXT PRIMARY KEY,
        image TEXT,
        title TEXT,
        body TEXT NOT NULL,
        reactions INTEGER DEFAULT 0,
        userId TEXT NOT NULL,
        tags TEXT
    )`;
    
//     const insertQuery1 = `
//     INSERT INTO posts (id, image, title, body, reactions, userId, tags)
// VALUES (
//     ${id},${image},${tittle},${body},${reactions},${userId},${tags}
// );`;
    const insertQuery = `
    INSERT INTO userposts (post_id, image, title, body, reactions, userId, tags)
VALUES (
    ?,?,?,?,?,?,?
);`;
    
    await runInsertQuery(createQuery, insertQuery, args, (err) => {
        if (err) console.log(err);
    });
    res.send(post_id);

});

router.post('/allPosts',async(req,res)=>{
    try{
        const selectQuery = `SELECT * FROM userposts ORDER BY RANDOM() LIMIT 10;`;
        const postData = await runSelectQuery(selectQuery, []);
        res.send(postData);
    }
    catch(e){
        res.status(400).send(e.message);
    }
})

router.post('/upload',upload.single("image"),(req,res)=>{
    try {
        if(req.file){
        // Access the uploaded file name
        const fileName = req.file.filename;

        // Construct the file path using getUploadedFilePath function
        const filePath = upload.getUploadedFilePath(fileName);
        console.log(filePath)
        // Do something with the filePath, like storing it in the database or sending it in the response
        res.json({ filePath: filePath });
        }
        res.json({ filePath: "No Photo"});
    } catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports = router;
