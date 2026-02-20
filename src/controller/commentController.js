const commentService = require('../service/commentService');

const createComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;
    const userId = req.user.id;

    const result = await commentService.createComment(
      postId,
      userId,
      comment
    );

    res.status(201).json(result);

  } catch (error) {
    next(error);
  }
};

const getCommentsByPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await commentService.getCommentsByPost(postId);

    res.json(comments);

  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const userId = req.user.id;

    const result = await commentService.updateComment(
      id,
      userId,
      comment
    );

    res.json(result);

  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await commentService.deleteComment(id, userId);

    res.json(result);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment
};