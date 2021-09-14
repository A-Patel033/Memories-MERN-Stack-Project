import React from 'react'
import Post from './Post/Post';
import useStyle from './postsStyles';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

const Posts = ({ setCurrentID }) => {
    const {posts, isLoading} = useSelector((state) => state.posts);
    const classes = useStyle();

    if(!posts.length && !isLoading) return 'No Posts';

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} xs={12} sm={6} lg={4} item>
                        <Post post={post} setCurrentID={setCurrentID} />
                    </Grid>
                ))}
            </Grid>
        )
    );

}

export default Posts;