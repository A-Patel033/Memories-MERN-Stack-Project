import React from 'react';
import { Container } from '@material-ui/core';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';


export const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Container maxWidth='xl'>
                <NavBar />
                <Switch>
                    <Route exact path='/' component={() => <Redirect to='/posts'/> } />
                    <Route exact path='/posts' component={Home } />
                    <Route exact path='/posts/search' component={Home } />
                    <Route exact path='/posts/:id' component={PostDetails } />
                    <Route exact path='/auth' component={() => (!user ? <Auth/> : <Redirect to='/posts' />)} />
                </Switch> 
            </Container>
        </BrowserRouter>
    );
}
export default App;