const {pool} = require('../config/db');

const createPost = async (id, title, content) => {
    const res = await pool.query(`INSERT INTO posts (user_id, title, content) VALUES(? , ?, ?)`,
        [id, title, content]
    );
    return res;
}

const getAllPosts = async () => {
    const res = await pool.query(`SELECT content FROM posts`);
    return res[0];
}

const getPostfromDB = async (id) => {
    const [res] = await pool.query('SELECT content FROM posts WHERE id = ?', [id]);
    return res;
}

const updatePostInDB = async (userId, postId, content) => {
    const [res] = await pool.query(`UPDATE posts SET content= ? WHERE id = ? AND user_id = ?`, [content, postId, userId]);
    return res;
}

const getMyPosts = async (userId) => {
    const [res] = await pool.query(`SELECT content FROM posts WHERE user_id = ?`, [userId]);
    return res;
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