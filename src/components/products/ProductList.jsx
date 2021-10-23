import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core';
import { getProducts, deleteProduct } from '../../services/ProductService';
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

export function ProductList() {
    const classes = useStyles();

    const [user, setUser] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProducts();
        setUser(getCurrentUser());
    }, [])

    const getAllProducts = async () => {
        let response = await getProducts();
        setProducts(response.data.data);
    }

    const deleteProductData = async (id) => {
        let callbackUser = window.confirm('CONFIRMAR SI Esta seguro de eliminar el prudcto del Maestro ?');
        if (callbackUser) {
            await deleteProduct(id);
            getAllProducts();
        }
    }

    return (
        <>
        <br></br>
        <br></br>
        <h1 >...........Maestro de Productos Vigentes   - G5.0</h1>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.thead}>
                        <TableCell>Id Producto</TableCell>
                        <TableCell>Descripción Producto</TableCell>
                        <TableCell>Valor Producto $COP</TableCell>
                        <TableCell>Estado en Bodega</TableCell>
                        {user && (
                            <TableCell className={classes.button_add}>
                                <Button variant="contained" color="primary" component={Link} to="productos/agregar" >Ingresar Nuevo Producto</Button>
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        products.map(product => (
                            <TableRow className={classes.row} key={product._id}>
                                <TableCell>{product._id}</TableCell>
                                <TableCell>{product.descripcion}</TableCell>
                                <TableCell>{product.valor}</TableCell>
                                <TableCell>{product.estado ? "Disponible" : "Agotado"}</TableCell>
                                {user
                                    &&

                                    (<TableCell>
                                        <Button className={classes.button} variant="contained" component={Link} to={`productos/editar/${product._id}`} color="info">Editar Producto</Button>
                                        <Button variant="contained" color="secondary" onClick={() => deleteProductData(product._id)} >Eliminar Producto</Button>
                                    </TableCell>)
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}
