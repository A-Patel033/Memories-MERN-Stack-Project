import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import useStyles from './styleAuth';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from 'react-google-login';
import Input from './Input';
import Icon from './Icon';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import {signup, signin} from '../../actions/actionsAuth';

const initialState = { firstname: '', lastname: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignUp){
            dispatch(signup(formData, history));
        }else{
            dispatch(signin(formData, history));
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId; 
        try {
            dispatch({type: "AUTH", data: {result, token}});
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailer = (error) => {
        console.log(error);
        console.log("Google log in  is unsuccessful");
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <React.Fragment>
                                    <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastname" label="Last Name" handleChange={handleChange} half />
                                </React.Fragment>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit} >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="Use your google ID here"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailer}
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? "Already have an account ? Sing In" : "Don't have an account ? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
