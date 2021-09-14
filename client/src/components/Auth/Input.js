import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import React from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const Input = ({name, handleChange, label, autoFocus, handleShowPassword, type, half}) => {
    return (
        <Grid xs={12} sm={half ? 6 : 12} item >
            <TextField 
            name={name} 
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password' ? {
                endAdornment : (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }: null}
            />
        </Grid> 
    )
}

export default Input
