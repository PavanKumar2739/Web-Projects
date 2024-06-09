const { runSelectQuery } = require("../database/sqlLite/sqlLiteFun");

const generateImageId = async (userId) => {
    const posts = await runSelectQuery('Select * from userposts where userId = ?', [userId])
    if (posts.length > 0) {
        const lastPost = (posts[posts.length - 1].post_id);
        const postNo = parseInt(lastPost.slice(lastPost.length-1))
        const post_id = userId.toUpperCase() + Date.now() + 'POST_' + (postNo + 1);
        return post_id;
    }
    return userId.toUpperCase() + Date.now() + 'POST_' + 1;
}
module.exports = { generateImageId }