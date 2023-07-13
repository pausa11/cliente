import React, {useContext} from 'react';                            //se importa react y usecontext       
import { ShopContext } from "../../context/shop-context";           //importamos el context
import { CartItem } from './cart-item';                             //importamos el cartitem para cada item que se ingrese en el carrito
import "./cart.css";                                                //vinculamos el css
import { useNavigate } from 'react-router-dom'                      //se importa para poder redireccionar
import axios from 'axios';                                          //se usa para hacer peticiones al servidor
import { useState } from 'react';                                   //se importa usestate          
import { useEffect } from 'react';                                  //se importa useeffect                

const URI = 'http://localhost:3001/products/';                      //esta sera la ruta en la cual se haran las peticiones

export const Cart = () => {
    const context = useContext(ShopContext);                        //variable para usar el contexto
    const { cartItems, getTotalCartAmount } = useContext(ShopContext); //aqui almacenamos los elementos del carrito
    const totalAmount = getTotalCartAmount();                       //aqi se almacena el total de la compra
    const navigate = useNavigate();                                 //se usa para navegar entre direcciones

    const[products, setProducts] = useState([])                     //aqui se almacenan todos los productos
    useEffect(() => {                                               //se hace la peticion              
        getProducts()                                               //se llama a la funcion                    
    }, []);                                                         //se le pasa un arreglo vacio para que solo se ejecute una vez

    const getProducts = async () => {                               //aqui se obtienen todos los productos
        const res = await axios.get(URI)                            //se hace la peticion           
        setProducts(res.data)                                       //se guardan los productos en el arreglo       
    }

    const buy = async (e) => {                                      //esta funcion se encarga de procesar el pago
        e.preventDefault();                                         //se previene el comportamiento por defecto      
        console.log(cartItems);                                     //se imprime el carrito              
        await axios.put(URI + 'buy', {                              //se envian con este metodo para poder actualizar la base de datos desde el back
            "1": cartItems[1],
            "2": cartItems[2],
            "3": cartItems[3],
            "4": cartItems[4],
            "5": cartItems[5],
            "6": cartItems[6],
            "7": cartItems[7],
            "8": cartItems[8],
            "9": cartItems[9],
            "10": cartItems[10],
        })
        .then((res) => {                                            //se imprime la respuesta                       
            alert(res);                                             //se muestra un mensaje de exito
        }).catch((err) => {                                         //se imprime el error            
            alert(err.message)                                      //se muestra un mensaje de error          
        });
        context.setPayAumount(totalAmount);                         //antes de pasar al portal de pago se agrega en el context el valor de la compra para poder cobrar ese monto
        navigate('/stripe');                                        //se navega hacia la pagina de pago
    }

    return (                                                        //se retorna el componente                      
        <div className="cart">                                      {/*se crea el componente contenedor de clase cart*/}          
            <div>       
                <h1> Your Cart Items</h1>                           {/*se crea el componente*/}       
            </div>
            <div className="cartItems">
                {products.map((product) => {
                    if (cartItems[product.id] !== 0) {
                    return <CartItem key={product.id} data={product} />;
                    }
                    return null; // Agregamos un return null en caso de que no se cumpla la condición
                })}
            </div>
            {totalAmount > 0 ?                                      //si el total es mayor que 0
            <div className="checkout">                              {/*se crea el componente*/}       
                <p> Subtotal: ${totalAmount}</p>                    {/*imprime el total de la compra calculado */}
                <button onClick={() => navigate ("/shop")}> Continue Shopping</button>{/*si se le da click se devuelve a la tienda principal */}
                <button onClick={buy}> Checkout </button>           {/*si se le da clic llama a la funcion buy que lleva a procesar el pago */}
            </div>
            : <h1> Your Cart is Empty </h1>}                        {/*si el carrito esta vacio se muestra un mensaje */}
        </div>
    )
};