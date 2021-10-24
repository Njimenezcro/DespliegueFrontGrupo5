import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core';
import { getSale, deleteSale } from '../../services/SalesService';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';
import { getCurrentUser } from '../../services/AuthService';

const initialValue = {
    "productos": [],
    "fecha": "",
    "_id": "",
    "valor": 0,
    "nombreCliente": "",
    "idCliente": "",
    "idVendedor": ""
}

const useStyles = makeStyles({
    table: {
        width: '95%',
        margin: '1% auto 0 auto'
    },
    thead: {
        textAlign: "center",
        '& > *': {
            fontSize: 17,
            background: '#000000',
            color: '#FFFFFF'
        }
    },

    row: {
        '& > *': {
            fontSize: 17
        }
    },
    button: {
        marginInline: '20px'
    },
    button_add: {
        textAlign: "center"
    }
})


export function SaleDetail() {
    const classes = useStyles();
    const [sale, setSale] = useState(initialValue);
    const [user, setUser] = useState([])
    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        loadSaleData(id);
        setUser(getCurrentUser());
    }, [])

    const loadSaleData = async (id) => {
        let response = await getSale(id);
        setSale(response.data.data);
    }
    
    const deleteSaleData = async (id) =>{
        let callbackUser = window.confirm('Esta seguro de eliminar la venta');
        if (callbackUser) {
            await deleteSale(id);
            history.push('/ventas')
        }
    }

    return (
        <>
            <Table className={classes.table}>
                <TableHead>
                    <h1> Detalle de la Venta - G5.0</h1>
                    <br></br>
                    <br></br>
                    <br></br>
                    <TableRow className={classes.thead}>
                        <TableCell>Fecha de la Venta: {sale.fecha.slice(0, 10)}</TableCell>
                        <TableCell>Valor Venta $COP: {sale.valor}</TableCell>
                        <TableCell>Id Cliente: {sale.idCliente}</TableCell>
                        <TableCell>Nombre Cliente: {sale.nombreCliente}</TableCell>
                        <TableCell>Id Vendedor: {sale.idVendedor}</TableCell>
                        {user && (
                            <TableCell className={classes.button_add}>
                                
                                <Button variant="contained" color="secondary" onClick={() => deleteSaleData(sale._id)} >Eliminar Venta</Button>
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
            </Table>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.thead}>
                        <TableCell>Id Producto</TableCell>
                       {/*  <TableCell>Descripcion Producto</TableCell> */}
                        <TableCell>Valor Unitario Producto</TableCell>
                        <TableCell>Cantidad </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                        sale.productos.map(product => (
                            <TableRow className={classes.row} key={product._id}>
                                <TableCell>{product._id}</TableCell>
                               {/*  <TableCell>{product.descripcion}</TableCell> */}
                                <TableCell>{product.valor}</TableCell>
                                <TableCell>{product.cantidad}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}
