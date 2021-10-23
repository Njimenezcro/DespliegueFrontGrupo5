import React,{useEffect, useState} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ProductList } from './components/products/ProductList';
import { CreateProduct } from './components/products/CreateProduct';
import { EditProduct } from './components/products/EditProduct';

import { SalesList } from './components/sales/SalesList';
import { SaleDetail } from './components/sales/SaleDetail';
import { CreateSale } from './components/sales/CreateSale';
import { EditSale } from './components/sales/EditSale'

import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Home } from "./components/Home";
import { NotFound } from './components/NotFound';
import { NavBar } from './components/NavBar';

import { getCurrentUser } from './services/AuthService';
//import { verifyToken } from './services/AuthService';

export function App() {

    /*setTimeout(() => {
        verifyToken()
    }, 80000);*/ 

    const [user, setUser] = useState([])
    useEffect(() => {
        setUser(getCurrentUser());
    }, [])

    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/productos" component={ProductList} />
                <Route exact path="/ventas" component={SalesList} />
                <Route exact path="/ventas/detalle/:id" component={SaleDetail} />
                {user && (
                    <>
                        <Route exact path="/productos/agregar" component={CreateProduct} />
                        <Route exact path="/productos/editar/:id" component={EditProduct} />
                        <Route exact path="/ventas/agregar" component={CreateSale} />
                        <Route exact path="/ventas/editar/:id" component={EditSale} />
                    </>
                )}
                <Route exact path="/login" component={Login} />
                <Route exact path="/registrarse" component={Signup} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}


