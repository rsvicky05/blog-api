const AppError = require("../utils/AppError");
const services = require('../service/postService');

const postBlog = async (req, res, next) => {
    try{
        const response = await services.create(req.user, req.body);
        res.status(201).send({id: response.insertId, message: "Blog created successfully"})
    }catch(err){
        next(err);
    }
}

const getPosts = async (req, res, next) => {
    try{
        const posts = await services.getAllPosts();
        res.status(200).send(posts[0]);
    }catch(err){
        next(err);
    }
}

const getSinglePost = async (req, res, next) => {
    try{
        const {postId} = req.params; 
        const post = await services.getPost(postId);
        res.status(200).send(post[0]);
    }catch(err){
        next(err);
    }
}

const updatePost = async (req, res, next) => {
    try{
        const {postId} = req.params;
        const isAppend = Boolean(req.query.append);
        const {content} = req.body;
        const userId = req.user.id;
        console.log(userId)
        const response = await services.update(userId, postId, content, isAppend);
        res.status(200).send("Successfully updated the post");
    }catch(err){
        next(err);
    }
}

const getMinePosts = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const posts = await services.getMinePosts(userId);
        res.status(200).send(posts);
    }catch(err){
        next(err)
    }
}

const deletePost = async (req, res, next) => {
    try{
        const role = req.user.role;
        const userId = req.user.id;
        const postId = req.params.postId;
        const response = await services.deletePost(userId, postId, role);
        res.status(200).send({message: "Deleted Successfully"});
    }catch(err){
        next(err);
    }
}

module.exports = {postBlog, getPosts, getSinglePost, updatePost, getMinePosts, deletePost}