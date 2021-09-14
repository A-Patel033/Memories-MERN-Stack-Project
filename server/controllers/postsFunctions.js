import mongoose from 'mongoose';
import postMessage from '../models/postSchema.js'

export const getPosts = async (req, res) => {
    const {page} = req.query;

    try {
        const LIMIT = 6; 
        const startIndex = (Number(page) -1) * LIMIT; //get the starting index of every page
        const totalPosts = await postMessage.countDocuments({});

        const posts = await postMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(totalPosts / LIMIT)});
        // console.log(postMessages, postMessages.length);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await postMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async(req, res) => {
    const {searchQuery, tags} = req.query;
    // console.log(searchQuery, tags);

    try {
        const title = new RegExp(searchQuery, 'i');
        
        const posts = await postMessage.find({$or: [{title}, {tags: {$in: tags.split(',')} }] });
        // console.log(posts);

        res.json({data: posts});
    } catch (error) {
        res.status(404).json({message: error.message});
        console.error(error);
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    

    const newPost = new postMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;
    // console.log(post, id);

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post found with that ID');

    const updatedPost = await postMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});
    res.json(updatePost);
}

export const deletePost = async (req, res) => {
    const {id} = req.params;
    // console.log(id);

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post found with that ID');
    
        await postMessage.findByIdAndRemove(id);
        res.json('Post deleted successfully');
    } catch (error) {
        console.log(error);
    }

}

export const likePost = async (req, res) => {
    const {id} = req.params;

    if(!req.userId) return res.json({message: 'Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post found with that ID');

    const post = await postMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId)
    }else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await postMessage.findByIdAndUpdate(id,  post, { new : true});

    res.json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await postMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await postMessage.findByIdAndUpdate(id, post, {new: true} );

    res.json(updatedPost);
}