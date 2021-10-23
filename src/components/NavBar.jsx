import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, makeStyles, Button, Box, ListItemText, ListItemAvatar, ListItem, Avatar } from '@material-ui/core'
import { NavLink } from 'react-router-dom';
import { getCurrentUser } from '../services/AuthService';
import { blue } from '@material-ui/core/colors';

const useStyle = makeStyles({
    header: {
        background: '#111111'
    },
    tabs: {
        color: '#FFFFFF',
        marginRight: 20,
        textDecoration: 'none',
        fontSize: 26
    },
    tab_end: {
        color: '#FFFFFF',
        marginRight: 20,
        textDecoration: 'none',
        fontSize: 20,
        alignItems: 'end'

    }
})

const initialValue = {
    email: ""
}

export function NavBar() {

    const [user, setUser] = useState(initialValue);
    const classes = useStyle();

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    const logout = () => {
        localStorage.clear();
        window.location = "/";
    }
    return (
        <Box sx={{ display: 'flex', p: 1 }}>
            <AppBar position="static" className={classes.header}>
                <Toolbar>

                    <Box sx={{ flexGrow: 1 }}>
                        <NavLink className={classes.tabs} to="/">Inicio /</NavLink>
                        <NavLink className={classes.tabs} to="/productos"> Administracion de Productos /</NavLink>
                        <NavLink className={classes.tabs} to="/ventas"> Gestion de Ventas /</NavLink>
                    </Box>
                    {!user && (
                        <>
                            <NavLink className={classes.tab_end} to="/registrarse">
                                <Button variant="contained" color="primary">
                                    registrarse
                                </Button>
                            </NavLink>
                            <NavLink className={classes.tab_end} to="/login">
                                <Button variant="contained" color="primary">
                                    Login
                                </Button>
                            </NavLink>
                        </>)}
                    {user && (
                        <>
                            <Button className={classes.tab_end} >
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                            👤
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.email} />
                                </ListItem>
                            </Button>
                            <Button variant="contained" onClick={() => logout()} color="secondary">
                                Logout
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>

    )
}
