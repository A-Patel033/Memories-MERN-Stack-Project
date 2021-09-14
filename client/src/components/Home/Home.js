import React, { useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import ChipInput from 'material-ui-chip-input';
import Posts from '../Posts/Posts';
import Forms from '../Forms/Forms';
import { useDispatch } from 'react-redux';
import { getPostBySearch, getPosts } from '../../actions/actionsPosts';
// import useStyle from '../../styles';
import Pagination from '../pagination';
import useStyles from './styles'
import Button from '@material-ui/core/Button';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Home = () => {

    const [currentID, setCurrentID] = useState(null);
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([]);
    // const classes = useStyle();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();


    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    }
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag])

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))


    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container className={classes.gridContainer} justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentID={setCurrentID} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color='inherit'>
                            <TextField
                                name='search'
                                variant='outlined'
                                label='Search Memories'
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                variant='outlined'
                                label='Search Tags'
                            />
                            <Button onClick={searchPost} variant='contained' className={classes.searchButton} color='primary'>Search</Button>
                        </AppBar>
                        <Forms currentID={currentID} setCurrentID={setCurrentID} />
                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
