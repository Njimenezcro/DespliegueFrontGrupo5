import react, { useState, useEffect } from 'react';
import { FormGroup, Select, MenuItem, Table, TableHead, TableCell, TableRow, TableBody, FormControl, DesktopDatePicker, InputLabel, Input, Button, makeStyles, Typography, RadioGroup, FormLabel, FormControlLabel, Radio } from '@material-ui/core';
import { editSale, getSale } from '../../services/SalesService';
import { getProducts } from '../../services/ProductService';
import { useHistory, useParams } from 'react-router-dom';
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
        width: '60%',
        margin: '100px auto 0 auto',
        '& > *': {
            marginTop: 20
        }
    },
    table: {
        width: '100%',
        margin: '1% auto 0 auto'
    },
    thead: {
        '& > *': {
            fontSize: 20,
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
        textAlign: "right"
    }
})


export function EditSale() {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState(null)

    const { id } = useParams();

    useEffect(() => {
        setUser(getCurrentUser());
        loadProductsData();
    }, [])

    const [products, setProducts] = useState([]);
    const [sale, setSale] = useState(initialValue);
    const [newProduct, setNewProduct] = useState(initialValueProduct);

    const [creatingProductState, setCreatingProductState] = useState('minimizado');

    const { productos, fecha, valor, nombreCliente, idCliente, idVendedor } = sale;

    const loadSaleData = async () => {
        let response = await getSale(id);
        response.data.data.productos.forEach(element => {
            element.descripcion = products.find(item => item._id === element._id).descripcion
        });
        setSale(response.data.data);
    }

    const loadProductsData = async () => {
        let response = await getProducts();
        setProducts(response.data.data);
        loadSaleData();
    }

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

    

    const addProduct = (newProduct) => {
        let productsCopy = productos
        productsCopy.push(newProduct)
        setSale({ ...sale, productos: productsCopy });
        setNewProduct(initialValueProduct);
        changeStateCreateProductForm('minimizado');
    }

    const editSaleData = async () => {
        let response = await editSale(sale);
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
                <Typography variant="h4">Editar Venta</Typography>
                <FormControl>
                    <InputLabel htmlFor="my-input">Id</InputLabel>
                    <Input  type="text" readOnly disabled  value={id} id="my-input" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Valor</InputLabel>
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
                    <FormLabel component="legend">Fecha</FormLabel>
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
                                    <Button variant="contained" onClick={() => changeStateCreateProductForm('desplegado')} >Agregar</Button>
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
                    <Button variant="contained" onClick={() => editSaleData()} color="primary">Editar Venta</Button>
                </FormControl>
            </FormGroup>
        </>
    )
}
