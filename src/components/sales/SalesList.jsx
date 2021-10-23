import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core';
import { getSales, deleteSale} from '../../services/SalesService';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../services/AuthService';

const useStyles = makeStyles({
    table: {
        width: '95%',
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
            fontSize: 13
        }
    },
    button: {
        marginInline: '20px'
    },
    button_add: {
        textAlign: "center"
    }
})

export function SalesList() {
    const classes = useStyles();

    const [user, setUser] = useState([]);
    const [sales, setSales] = useState([]);

    useEffect(() => {
        loadSalesData();
        setUser(getCurrentUser());
    }, [])

    const loadSalesData = async () =>{
        let response = await getSales();
        setSales(response.data.data);
    }

    const deleteSaleData = async (id) =>{
        let callbackUser = window.confirm('CONFIRMAR SI Esta seguro de eliminar la venta ?');
        if (callbackUser) {
            await deleteSale(id);
            loadSalesData();
        }
    }

    return (
        <Table className={classes.table}>
                <TableHead>
                <br></br>
                <br></br>            
                    <br></br>
                    <TableRow className={classes.thead}>
                        <TableCell>Fecha de la Venta</TableCell>
                        <TableCell>Valor Total de la Venta</TableCell>
                        <TableCell>Id Cliente</TableCell>
                        <TableCell>Nombre del Cliente</TableCell>
                        <TableCell>Id del Vendedor</TableCell>
                        {user && (
                            <TableCell className={classes.button_add}>
                                <Button variant="contained" color="primary" component={Link} to="ventas/agregar" >Agregar Nueva Venta</Button>
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        sales.map(sale => (
                            <TableRow className={classes.row} key={sale._id}>
                                <TableCell>{sale.fecha.slice(0,10)}</TableCell>
                                <TableCell>{sale.valor}</TableCell>
                                <TableCell>{sale.idCliente}</TableCell>
                                <TableCell>{sale.nombreCliente}</TableCell>
                                <TableCell>{sale.idVendedor}</TableCell>
                                {user
                                    &&

                                    (<TableCell>
                                        <Button className={classes.button} variant="contained" component={Link} to={`ventas/detalle/${sale._id}`} color="primary">Detalle de la Venta</Button>
                                        <Button className={classes.button} variant="contained" component={Link} to={`ventas/editar/${sale._id}`} color="info">Editar Datos de Venta</Button>
                                        <Button variant="contained" color="secondary" onClick={() => deleteSaleData(sale._id)} >Eliminar</Button>
                                    </TableCell>)
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
    )
}
