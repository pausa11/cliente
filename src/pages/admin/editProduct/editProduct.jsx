import React from 'react';                                      //se importa react
import { Product } from './Product';                            //se importa el componente product
import axios from 'axios';                                      //se importa axios
import { useState } from 'react';                               //se importa usestate
import { useEffect } from 'react';                              //se importa useeffect                        

const URI = 'http://localhost:3001/products/';                  //aqui se hacen las peticiones

export const EditProduct = () => {                              //se crea el componente           

    const[products, setProducts] = useState([])                 // aqui se guardan los productos
    useEffect(() => {                                           //se hace la peticion                  
        getProduct()                                            //se llama a la funcion
    }, []);                                                     //se le pasa un arreglo vacio para que solo se ejecute una vez

    const getProduct = async () => {                            //aqui se hace la solicitud
        const res = await axios.get(URI)                        //se hace la peticion               
        setProducts(res.data)                                   //se guardan los productos en el arreglo                   
    }

    return (                                                    //se retorna el componente              
        <div className="shop">                                  {/*se crea el componente contenedor de clase shop*/}
            <div className="shopTitle">                         {/*se crea el componente*/}
                <h1>Edit Products</h1>                          {/*se crea el componente*/}               
            </div>
            <div className="products">                          {/*se crea el componente*/}           
                {products.map((product) => (                    //se mapea el arreglo de productos
                    <Product data={product} />                  // se muestran todos los productos que estan en el arreglo
                ))}                                                     
            </div>
        </div>
    )
};