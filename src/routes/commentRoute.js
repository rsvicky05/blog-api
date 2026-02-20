const express = require('express');
const {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment
} = require('../controller/commentController')

const router = express.Router({mergeParams: true});


router.post('/', createComment);

router.get('/', getCommentsByPost);

router.put('/:id', updateComment);

router.delete('/:id', deleteComment);

module.exports = router;