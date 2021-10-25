import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core';
import { getUsers, deleteUser } from '../../services/UsersService';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../services/AuthService';

const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '1% auto 0 auto'
    },
    thead: {
        '& > *': {
            fontSize: 17,
            background: '#000000',
            color: '#FFFFFF'
        }
    },
    row: {
        '& > *': {
            fontSize: 15
        }
    },
    button: {
        marginInline: '10px'
    },
    button_add: {
        textAlign: "center"
    }
})

 export function UserList() {
    const classes = useStyles();

    const [user, setUser] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers();
        setUser(getCurrentUser());
    }, [])

    const getAllUsers = async () => {
        let response = await getUsers();
        setUsers(response.data.data);
    }

    const deleteUserData = async (id) => {
        let callbackUser = window.confirm('CONFIRMAR SI Esta seguro de eliminar el Usuario ?');
        if (callbackUser) {
            await deleteUser(id);
            getAllUsers();
        }
    }

    return (
        <>
        
        <br></br>
        <br></br>
        <h1 >...........Informe de Usuario Vigentes   - G5.0</h1>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.thead}>
                        <TableCell>Id Usuario</TableCell>
                        <TableCell>Nombre Usuario</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Password</TableCell>
                        {user && (
                            <TableCell className={classes.button_add}>
                                <Button variant="contained" color="primary" component={Link} to="usuarios/agregar" >Ingresar Nuevo Usuario</Button>
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map(userD => (
                            <TableRow className={classes.row} key={userD._id}>
                                <TableCell>{userD._id}</TableCell>
                                <TableCell>{userD.fullName}</TableCell>
                                <TableCell>{userD.email}</TableCell>
                                <TableCell>{userD.password}</TableCell>
                                {/* {user
                                    &&

                                    (<TableCell>
                                        <Button className={classes.button} variant="contained" component={Link} to={`usuarios/editar/${user._id}`} color="info">Editar Usuario</Button>
                                        <Button variant="contained" color="secondary" onClick={() => deleteUserData(user._id)} >Eliminar Usuario</Button>
                                    </TableCell>)
                                } */}
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

