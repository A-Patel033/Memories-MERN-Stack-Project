import React, { useState } from 'react'
import useStyle from './postStyles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/actionsPosts';
import { useHistory } from 'react-router';


const Post = ({ post, setCurrentID }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    const [likes, setLikes] = useState(post?.likes);

    const handleDelete = () => {
        // e.preventDefault();

        dispatch(deletePost(post._id))
        history.push('/');
    };

    const userId = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = post.likes.find((like) => like === userId);
    
    const handleLike = async () => {
        dispatch(likePost(post._id));

        if(hasLikedPost){
            setLikes(post.likes.filter((id) => id !== userId));
        }else{
            setLikes([...post.likes, userId]);
        }
    };

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
                ? (
                    <React.Fragment><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</React.Fragment>
                ) : (
                    <React.Fragment><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</React.Fragment>
                );
        }

        return <React.Fragment><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</React.Fragment>;
    };

    const openPost = () => {
        history.push(`/posts/${post._id}`);
    }

    return (
        <Card className={classes.card} raised elevation={6}>

            <ButtonBase component="span" name="test" focusRipple className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6"> {post.name}</Typography>
                    <Typography variant="body2"> {moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" > {post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom > {post.title}</Typography>
                <CardContent className={classes.message}>
                    <Typography variant="body1" color="textSecondary" component="p"> {post.message}</Typography>
                </CardContent>
            </ButtonBase>

            <CardActions style={{ "justify-content": "space-between" }} classes={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result?.name} onClick={handleLike}>
                    <Likes />
                </Button>
                <div className={classes.deleteAndEdit}>
                    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                        (<Button size="small" color="secondary" onClick={handleDelete}>
                            <DeleteIcon fontSize="small" />
                            &nbsp;
                        </Button>
                        )}
                    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                        (<div>
                            <Button color="secondary" size="small" onClick={() => setCurrentID(post._id)}>
                                <EditOutlinedIcon fontSize="default" />
                            </Button>
                        </div>
                        )}
                </div>
            </CardActions>

        </Card>
    )
}

export default Post;