import React from 'react';                              //importa react 
import { Product } from './productAddtoCart';           //importa el producto
import './shopAddtoCart.css';                           //importa el css
import axios from 'axios';                              //importa axios para hacer peticiones  
import { useState } from 'react';                       //importa useState para hacer peticiones
import { useEffect } from 'react';                      //importa useEffect para hacer peticiones
import LogoMenu from '../../components/logo2.jsx'

const URI = 'https://tiendaxd.onrender.com/products/' || 'http://localhost:3001/products/';          //aqui se hacen las peticiones 

export const ShopAddtoCart = () => {                    //aqui se exporta la tienda             

    const[products, setProducts] = useState([])         //aqui se guardan todos los productos
    useEffect(() => {                                   //aqui se usa useEffect para hacer peticiones
        getProducts()                                   //aqui se usa getProducts para hacer peticiones
    }, []);                                             //aqui se hace la peticion para todos los usuarios

    const getProducts = async () => {                   //aqui se hace la solicitud 
        const res = await axios.get(URI)                //aqui se hace la peticion get a la ruta de los usuarios
        setProducts(res.data)                           //aqui se almacenan los datos de los usuarios en el hook users
    }
    return (                                            //aqui se retorna el html                   
        <div className="shop">                          {/*aqui se crea la tienda */}         
            <div className="shopTitle">                 {/*aqui se crea el titulo de la tienda */}       
                <LogoMenu/>                             {/*aqui se llama el logo de la tienda */}       
            </div>
            <div className="products">                  {/*aqui se crean los productos */}         
                {products.map((product) => (            //aqui se mapean los productos
                    <Product key={product.id} data={product} />          //aqui por todo el arreglo de productos se imprimen los productos
                ))}
            </div>
        </div>
    )
};