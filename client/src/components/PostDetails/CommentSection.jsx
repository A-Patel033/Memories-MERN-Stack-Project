import { Button, TextField, Typography } from "@material-ui/core";
import React, { useState, useRef } from "react";
import useStyles from './postDetailsStyles';
import { commentPost } from '../../actions/actionsPosts';
import { useDispatch } from "react-redux";

const CommentSection = ({ post }) => {

    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleClick = async () => {
        const finalComment = `${user.result.name} : ${comment}`;
        const newComment = await dispatch(commentPost(finalComment, post._id));

        setComments(newComment);
        setComment('')
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant="h6">Commnets</Typography>
                {comments?.map((c, i) => (
                    <Typography variant="subtitle1" key={i} gutterBottom>
                        <strong>{c.split(': ')[0]}</strong>
                        {c.split(':')[1]}
                    </Typography>
                ))}
                <div ref={commentsRef} />
            </div>
            {user?.result?.name && (
                <div style={{ width: '70%' }}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                    <TextField
                        fullWidth
                        rows={4}
                        variant='outlined'
                        label='Comment'
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant='contained' color='primary' onClick={handleClick} >
                        Comment
                    </Button>
                </div>
            )}
        </div>
    )
}

export default CommentSection;