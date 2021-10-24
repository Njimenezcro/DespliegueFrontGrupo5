import react, { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography, RadioGroup, FormLabel, FormControlLabel, Radio } from '@material-ui/core';
import { editProduct, getProduct } from '../../services/ProductService';
import { useHistory, useParams } from 'react-router-dom';
import { verifyToken } from '../../services/AuthService'



const initialValue = {
    valor: '',
    descripcion: '',
    estado: true,
}











const useStyles = makeStyles({
    container: {
        width: '40%',
        margin: '100px auto 0 auto',
        '& > *': {
            marginTop: 15
        }
    }
})





export function EditProduct() {
    const [product, setProduct] = useState(initialValue);
    const { valor, descripcion, estado } = product;
    const classes = useStyles();
    let history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        verifyToken();
        loadProductData();
    }, [])

    const loadProductData = async () => {
        let response = await getProduct(id);
        setProduct(response.data.data);
    }

    const onValueChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    const onStateChange = (state) => {
        setProduct({ ...product, "estado": state });
    }

    const updateProductData = async () => {
        await editProduct(product);
        history.push('/productos');
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Edicion Datos del Producto - G5.0</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Descripción del Producto</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="descripcion" value={descripcion} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Valor Unitario de Producto $COP</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="valor" value={valor} id="my-input" />
            </FormControl>
            <FormControl component="fieldset">
                <FormLabel component="legend">Estado en Bodega</FormLabel>
                <RadioGroup
                    name='estado'
                    onChange={(e) => onStateChange(e.target.value === "disponible")}
                    aria-label="estado"
                    defaultValue="disponible"
                    value={estado ? "disponible" : "noDisponible"}>
                    <FormControlLabel value="disponible" control={<Radio />} label="Disponible" />
                    <FormControlLabel value="noDisponible" control={<Radio />} label="No Disponible" />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <Button variant="contained" onClick={() => updateProductData()} color="primary">Guardar Cambios en Edicion de Producto</Button>
            </FormControl>
        </FormGroup>
    )
}
