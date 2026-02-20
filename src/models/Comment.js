const {pool} = require('../config/db');

const createComment = async (postId, userId, content) => {
  const [result] = await pool.query(
    `INSERT INTO comments (post_id, user_id, comment)
     VALUES (?, ?, ?)`,
    [postId, userId, content]
  );

  return result.insertId;
};

const getCommentsByPost = async (postId) => {
  const [rows] = await pool.query(
    `SELECT c.id, c.comment, c.created_at, u.first_name
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.post_id = ?
     ORDER BY c.created_at DESC`,
    [postId]
  );

  return rows;
};

const updateComment = async (commentId, userId, content) => {
  const [result] = await pool.query(
    `UPDATE comments
     SET comment = ?
     WHERE id = ? AND user_id = ?`,
    [content, commentId, userId]
  );

  return result;
};

const deleteComment = async (commentId, userId) => {
  const [result] = await pool.query(
    `DELETE FROM comments
     WHERE id = ? AND user_id = ?`,
    [commentId, userId]
  );

  return result;
};

module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment
};