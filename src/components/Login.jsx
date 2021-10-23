import React, { useState } from 'react'
import { Paper, Grid, TextField, makeStyles, Button, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { loginAuth } from '../services/AuthService';

const useStyles = makeStyles({
    container: {
        width: '300px',
        padding: '4%',
        margin: '100px auto 0 auto',
    }
})

const initialValue = {
    email: '',
    password: ''
}


export function Login() {

    const [credentials, setCredentials] = useState(initialValue)

    const {email, password} = credentials

    const classes = useStyles();

    const onValueChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const startLogin = async () => {
        let response = await loginAuth(credentials);
        if(response.status === 200){
            let token = response.data.token;
            localStorage.setItem('token',token);
            window.location = "/";
        }
    }

    return (
        <Paper className={classes.container} >
        <Typography variant="h4">Inicia sesión</Typography>
        <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
                <TextField value={email} name="email" onChange={(e) => onValueChange(e)} label="Email" type="email" fullWidth autoFocus required />
            </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
            <Grid item md={true} sm={true} xs={true}>
                <TextField  value={password} name="password" onChange={(e) => onValueChange(e)} label="Password" type="password" fullWidth required />
            </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button variant="outlined" onClick={() => startLogin()} color="primary" style={{ textTransform: "none" }}>Inicia sesión</Button>
        </Grid>
    </Paper>
    )
}
