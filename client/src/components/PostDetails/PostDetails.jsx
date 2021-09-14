import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useHistory, useParams } from 'react-router';
import useStyles from './postDetailsStyles';
import { getPost, getPostBySearch } from '../../actions/actionsPosts';
import CommentSection from './CommentSection';


const PostDetails = () => {

    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id))
    }, [id]);

    useEffect(() => {
        if (post) {
            dispatch(getPostBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post]);

    if (!post) return null;

    const openPost = (_id) => history.push(`/posts/${_id}`);

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    {/* <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography> */}
                    <CommentSection post={post}/>
                    <Divider style={{ margin: '20px 0' }} />
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://www.google.com/search?q=melbourne&sxsrf=AOaemvKgkwGm4nz9jwVUJE1HQbxOJK3rfQ:1631455347216&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjPzL_jzPnyAhVT63MBHeu2CbMQ_AUoA3oECAEQBQ&biw=1792&bih=843#imgrc=oxRGqza5S16ZWM&imgdii=IMO5YoFMteesCM'} alt={post.title} />
                </div>
            </div>
            {recommendedPosts.length > 0 && (
                <div className={classes.section}>
                    <Typography gutterBottom fontWeight="fontWeightBold" variant='h5'>You might also like: </Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                            <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom fontWeight="fontWeightBold" variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                <img src={selectedFile} alt=" " width="200px" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </Paper>
    );
};

export default PostDetails
