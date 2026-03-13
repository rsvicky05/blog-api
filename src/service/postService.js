const {createPost, getAllPosts, getPostfromDB, updatePostInDB, deletePostInDB, deleteAnyPostInDB, getMyPosts} = require("../models/Post.js");
const cacheClient = require('../config/redis.js');
const AppError = require("../utils/AppError.js");
const sendMail = require('../utils/mailSender.js')

const create = async ({id} , {title, content}) => {
    if(!content){
        throw new AppError('Required fields are missing', 400)
    }
    const response = await createPost(id, title, content);
    sendMail("vigneshvicky09072005@gmail.com", title, content);

    return response;
}

const getPost = async (id) => {
    if(!id){
        throw new AppError('Post Id is missing', 400);
    }

    const cacheKey = `postId${id}`;
    const data = await cacheClient.get(cacheKey);
    
    if(data) {
        return JSON.parse(data);
    }

    
    const response = await getPostfromDB(id);
    if(response.length <= 0){
        throw new AppError('Post Not found', 404);
    }
    
    await cacheClient.setEx(cacheKey, 10, JSON.stringify(response[0]))
    
    return response[0];
}

const update = async (userId, postId, title, content, image) => {
    if(!postId){
        throw new AppError('Post Id is missing', 400);
    }

    const post = await getPostfromDB(postId);
    if(post.length <= 0){
        throw new AppError("Post Not Found", 404);
    }

    const res = await updatePostInDB(userId, postId, title, content, image);

    if(res.affectedRows === 0){
        throw new AppError('Access Denied', 403);
    }
    return res;
}

const getPosts = async () => {

    const cacheKey = 'posts';
    const data = await cacheClient.get(cacheKey);

    if(data){
        return JSON.parse(data);
    }

    const res = await getAllPosts();
    await cacheClient.setEx(cacheKey, 10, JSON.stringify(res));
    return res;
}

const getMinePosts = async (userId) => {
    if(!userId){
        throw new AppError('Unauthorized Access', 401);
    }

    const cacheKey = `User${userId}`;
    const data = await cacheClient.get(cacheKey);

    if(data){
        return JSON.parse(data);
    }

    const res = await getMyPosts(userId);
    await cacheClient.setEx(cacheKey, 10, JSON.stringify(res))
    return res;
}

const deletePost = async (userId, postId, role) => {
    if(!postId){
        throw new AppError('Post Id is missing', 400);
    }

    const post = await getPostfromDB(postId);
    if(post.length <= 0){
        throw new AppError("Post Not Found", 404);
    }

    if(role === "admin"){
        const res = await deleteAnyPostInDB(postId);
        return res;
    }
    
    if(role === 'user'){
        const res = await deletePostInDB(userId, postId);
        if(res.affectedRows === 0){
            throw new AppError("Permission denied to delete", 403)
        }
        return res;
    }
    
}

module.exports = {create, getPosts, getPost, update, getMinePosts, deletePost};