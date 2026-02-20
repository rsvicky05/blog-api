const express = require('express');
const {postBlog, getSinglePost, deletePost, updatePost, getPosts, getMinePosts} = require('../controller/postController');
const validate = require("../middlewares/validateMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const comments = require('./commentRoute');
const router = express.Router();

//Users
router.post('/', validate(['content']), postBlog);
router.get('/', getPosts);
router.get('/:postId', getSinglePost);
router.put('/:postId', validate(['content']), updatePost);
router.get('/mine', getMinePosts);
router.delete('/:postId', deletePost);

//comments
router.use('/:postId/comments', comments);

//Admin
router.delete('/admin/:postId', authorize('admin'), deletePost)


module.exports = router;