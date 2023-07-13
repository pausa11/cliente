import React from 'react';                                      //importa react                   
import { Product } from './product';                            //importa el producto
import './shop.css';                                            //importa el css        
import axios from 'axios';                                      //importa axios           
import { useState } from 'react';                               //importa useState     
import { useEffect } from 'react';                              //importa useEffect 
import LogoMenu from '../../components/logo2.jsx'     

const URI = 'http://localhost:3001/products/';                 //se hacen las peticiones aqui 

export const Shop = () => {                                     //se exporta la tienda           

    const[products,setProducts] = useState([])                  //se guardan todos los productos
    useEffect(() => {                                           //useEffect se usa para hacer peticiones
        getProducts()                                           //getProducts se usa para hacer peticiones
    }, []);                                                     //se hace la peticion para todos los usuarios

    const getProducts = async () => {                           //se hace la peticion para todos los usuarios
        const res = await axios.get(URI)                        //se hace la peticion get a la ruta de los usuarios
        setProducts(res.data)                                   //se almacenan los datos de los usuarios en el hook users
    }
    return (                                                    //se retorna el html                        
      <div className="shop">                                    {/*se crea la tienda */}           
          <div className="shopTitle">                           {/*se crea el titulo de la tienda */}
                <LogoMenu/>                                     {/*se llama el logo de la tienda */}
          </div>
          <div className="products">                            {/*se crean los productos */}           
              {products.map((product) => (                      //se mapean los productos         
                  <Product key={product.id} data={product} />                    //se llama al producto con sus propias informaciones 
              ))}
          </div>
      </div>
  )
};