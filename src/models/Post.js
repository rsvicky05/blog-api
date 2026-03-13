const {pool} = require('../config/db');

const createPost = async (id, title, content) => {
    const res = await pool.query(`INSERT INTO posts (user_id, title, content) VALUES(? , ?, ?)`,
        [id, title, content]
    );
    return res;
}

const getAllPosts = async () => {
    const res = await pool.query(`select posts.id, posts.title, posts.content, posts.image, posts.created_at, users.first_name, users.last_name from posts Join users on posts.user_id = users.id;`);
    return res[0];
}

const getPostfromDB = async (id) => {
    await pool.query(
    "UPDATE posts SET views = views + 1 WHERE id = ?",
    [id]
    );

    const [res] = await pool.query('SELECT posts.id, posts.title, posts.content, posts.image, posts.created_at, users.first_name, users.last_name from posts Join users on posts.user_id = users.id WHERE posts.id = ?', [id]);
    
    return res;
}

const updatePostInDB = async (userId, postId, title, content, image) => {
    const [res] = await pool.query(`UPDATE posts SET title=?, content= ?, image=? WHERE id = ? AND user_id = ?`, [title, content, image, postId, userId]);
    return res;
}

const getMyPosts = async (userId) => {
    const [res] = await pool.query(`SELECT * FROM posts WHERE user_id = ?`, [userId]);
    const [[views]] = await pool.query(
        `SELECT SUM(views) AS totalViews 
         FROM posts 
         WHERE user_id = ?`,
        [userId]
    );
    return {post: res, views};
}

const deletePostInDB = async (userId, postId) => {
    const [res] = await pool.query(`DELETE FROM posts WHERE id = ? AND user_id = ?`, [postId, userId]);
    return res;
}

const deleteAnyPostInDB = async (postId) => {
    const [res] = await pool.query(`DELETE FROM posts WHERE id = ?`, [postId]);
    return res;
}

module.exports = {createPost, getAllPosts, getPostfromDB, updatePostInDB, getMyPosts, deletePostInDB, deleteAnyPostInDB};