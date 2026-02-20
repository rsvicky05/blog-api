const {createPost, getAllPosts, getPostfromDB, updatePostInDB, deletePostInDB, deleteAnyPostInDB} = require("../models/Post.js");
const AppError = require("../utils/AppError.js");

const create = async ({id} , {content}) => {
    if(!content){
        throw new AppError('Required fields are missing', 400)
    }
    const response = await createPost(id, content);
    return response;
}

const getPost = async (id) => {
    if(!id){
        throw new AppError('Post Id is missing', 400);
    }

    const response = await getPostfromDB(id);
    if(response[0].length <= 0){
        throw new AppError('Post Not found', 404);
    }
    return response;
}

const update = async (userId, postId, content, isAppend) => {
    if(!postId){
        throw new AppError('Post Id is missing', 400);
    }

    const post = await getPostfromDB(postId);
    if(post.length <= 0){
        throw new AppError("Post Not Found", 404);
    }

    let prevContent = "";
    if(isAppend){
        prevContent = post[0].content;
    }else{
        prevContent = "";
    }

    prevContent = prevContent +  " " + content;
    const res = await updatePostInDB(userId, postId, prevContent);

    if(res.affectedRows === 0){
        throw new AppError('Access Denied', 403);
    }
    return res;
}


const getMinePosts = async (userId) => {
    if(!userId){
        throw new AppError('Unauthorized Access', 401);
    }

    const res = await getMyPosts(userId);
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

module.exports = {create, getAllPosts, getPost, update, getMinePosts, deletePost};