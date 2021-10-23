import react, { useState, useEffect } from 'react';
import { FormGroup, Select, MenuItem, Table, TableHead, TableCell, TableRow, TableBody, FormControl, DesktopDatePicker, InputLabel, Input, Button, makeStyles, Typography, RadioGroup, FormLabel, FormControlLabel, Radio } from '@material-ui/core';
import { addSale } from '../../services/SalesService';
import { getProducts } from '../../services/ProductService';
import { useHistory } from 'react-router-dom';
import { getCurrentUser, verifyToken } from '../../services/AuthService';


const initialValue = {
    productos: [],
    fecha: "2021-01-01",
    valor: 0,
    nombreCliente: "",
    idCliente: "",
    idVendedor: ""
}

const initialValueProduct = {
    _id: '',
    valor: 0,
    descripcion: '',
    cantidad: 0
}

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '100px auto 0 auto',
        '& > *': {
            marginTop: 10
        }
    },
    table: {
        width: '100%',
        margin: '1% auto 0 auto'
    },
    thead: {
        '& > *': {
            fontSize: 18,
            background: '#FFFFFF',
            color: '#000000'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    },
    button: {
        marginInline: '20px'
    },
    button_add: {
        textAlign: "center"
    }
})

export function CreateSale() {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(getCurrentUser());
        loadProductsData();
    }, [])

    const [products, setProducts] = useState([]);
    const [sale, setSale] = useState(initialValue);
    const [newProduct, setNewProduct] = useState(initialValueProduct);

    const [creatingProductState, setCreatingProductState] = useState('minimizado');

    const { productos, fecha, valor, nombreCliente, idCliente, idVendedor } = sale;

    const onValueChange = (e) => {
        setSale({ ...sale, [e.target.name]: e.target.value });
    }

    const onValueNewProductChange = (e) => {
        if (e.target.name === "_id") {
            let product = products.find(product => product._id === e.target.value)
            let newProductCopy = newProduct;
            newProductCopy.descripcion = product.descripcion;
            setNewProduct(newProductCopy);
        }
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });


    }

    const loadProductsData = async () => {
        let response = await getProducts();
        setProducts(response.data.data);
    }

    const addProduct = (newProduct) => {
        let productsCopy = productos
        productsCopy.push(newProduct)
        setSale({ ...sale, productos: productsCopy });
        setNewProduct(initialValueProduct);
        changeStateCreateProductForm('minimizado');
    }

    const addSaleData = async () => {
        let response = await addSale(sale);
        if (response.status === 201) {
            history.push('/ventas');
        }
    }

    const deleteProduct = (id) => {
        let productsCopy = productos.filter(product => product._id !== id);
        setSale({ ...sale, productos: productsCopy });
    }

    const changeStateCreateProductForm = (state) => {
        setCreatingProductState(state);
    }


    return (
        <>
            <FormGroup className={classes.container}>
                <Typography variant="h4">Agregar Datos Nueva Venta - G5.0</Typography>
                <FormControl>
                    <InputLabel htmlFor="my-input">Valor Total de la Venta $COP</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} type="number" name="valor" value={valor} id="my-input" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Id Cliente</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} type="number" name="idCliente" value={idCliente} id="my-input" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Nombre Cliente</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} type="text" name="nombreCliente" value={nombreCliente} id="my-input" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Id Vendedor</InputLabel>
                    <Input onChange={(e) => onValueChange(e)} type="number" name="idVendedor" value={idVendedor} id="my-input" />
                </FormControl>
                <FormControl compMMonent="fieldset">
                    <FormLabel component="legend">Fecha de la Venta</FormLabel>
                    <Input name="fecha" value={fecha} onChange={(e) => onValueChange(e)} type="date" />
                </FormControl>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.thead}>
                            <TableCell>
                                Id {creatingProductState === 'desplegado' &&
                                    (
                                        <>
                                            :<FormControl fullWidth>
                                                <Select
                                                    name="_id"
                                                    value={newProduct._id}
                                                    label="Id"
                                                    onChange={(e) => onValueNewProductChange(e)}>
                                                    {
                                                        products.map(product => (
                                                            <MenuItem value={product._id}>{product._id}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        </>
                                    )
                                }
                            </TableCell>
                            <TableCell>
                                Valor {creatingProductState === 'desplegado' &&
                                    (
                                        <>
                                            :<Input
                                                onChange={(e) => onValueNewProductChange(e)}
                                                value={newProduct.valor}
                                                type="text"
                                                name="valor" />
                                        </>
                                    )
                                }
                            </TableCell>
                            <TableCell>
                                Cantidad: {creatingProductState === 'desplegado' &&
                                    (
                                        <>
                                            :<Input
                                                onChange={(e) => onValueNewProductChange(e)}
                                                value={newProduct.cantidad}
                                                type="text"
                                                name="cantidad" />
                                        </>
                                    )
                                }
                            </TableCell>
                            <TableCell>
                                Descripcion {creatingProductState === 'desplegado' &&
                                    (<>: {newProduct.descripcion}</>)
                                }
                            </TableCell>
                            <TableCell className={classes.button_add}>
                                {creatingProductState === 'minimizado' && (
                                    <Button variant="contained" onClick={() => changeStateCreateProductForm('desplegado')} >Agregar Productos</Button>
                                )}
                                {creatingProductState === 'desplegado' && (
                                    <Button variant="contained" onClick={() => addProduct(newProduct)} >+</Button>
                                )}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            sale.productos.map(product => (
                                <TableRow className={classes.row} key={product._id}>
                                    <TableCell>{product._id}</TableCell>
                                    <TableCell>{product.valor}</TableCell>
                                    <TableCell>{product.cantidad}</TableCell>
                                    <TableCell>{product.descripcion}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => deleteProduct(product._id)} >X</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <FormControl>
                    <Button variant="contained" onClick={(e) => addSaleData()} color="primary">Agregar Nueva Venta</Button>
                </FormControl>
            </FormGroup>
        </>
    )
}
