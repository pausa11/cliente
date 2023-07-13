import React, { useContext } from "react";                              //se importa react y usecontext    
import { ShopContext } from "../../context/shop-context";               //importamos el contexto 

export const CartItem = (props) => {
    const { id, nombre, precio, img1 } = props.data;                    //con los props recibimos los datos extraidos de los productos y los almacenamos en las variables
    const { cartItems, addToCart, removeFromCart } = useContext(ShopContext);//almacenamos el context dentro de esas variables
    return  (
        <div className="cartItem">                                      {/*se crea el componente de clase cartItem*/}                      
            <img src={img1} alt="carrito" />                                          {/*se muestra la primera imagen del producto */}
            <div className="description">                               {/*se crea el componente de clase description*/}    
                <p> 
                    <b> {nombre} </b>                                   {/*se muestra el nombre del producto */}
                </p>
                <p> ${precio} </p>                                      {/*se muestra el precio del producto */}
                <div className="countHandler">                          {/*se crea el componente de clase countHandler*/}
                    <button onClick={() => removeFromCart(id)}> - </button>{/*se llama a la funcion para bajar y subir la cantidad del producto comprado y igualmente para el + */}
                    <input value={cartItems[id]} />                     {/*se muestra la cantidad de productos comprados */}         
                    <button onClick={() => addToCart(id)}> + </button>  {/*se llama a la funcion para bajar y subir la cantidad del producto comprado y igualmente para el - */}
                </div>
            </div>
        </div>
    );
};