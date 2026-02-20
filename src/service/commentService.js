const commentModel = require('../models/Comment');
const {pool} = require('../config/db');
const AppError = require('../utils/AppError');

const createComment = async (postId, userId, content) => {
  if (!content || content.trim() === '') {
    throw new AppError('Comment content is required', 400);
  }

  const [post] = await pool.query(
    `SELECT id FROM posts WHERE id = ?`,
    [postId]
  );

  if (post.length === 0) {
    throw new AppError('Post not found', 404);
  }

  const commentId = await commentModel.createComment(postId, userId, content);

  return { id: commentId };
};

const getCommentsByPost = async (postId) => {
  return await commentModel.getCommentsByPost(postId);
};

const updateComment = async (commentId, userId, content) => {
  if (!content || content.trim() === '') {
    throw new AppError('Comment content is required', 400);
  }

  const result = await commentModel.updateComment(
    commentId,
    userId,
    content
  );

  if (result.affectedRows === 0) {
    throw new AppError('Comment not found or not authorized', 403);
  }

  return { message: 'Comment updated' };
};

const deleteComment = async (commentId, userId) => {
  const result = await commentModel.deleteComment(commentId, userId);

  if (result.affectedRows === 0) {
    throw new AppError('Comment not found or not authorized', 403);
  }

  return { message: 'Comment deleted' };
};

module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment
};