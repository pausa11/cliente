import React, { useContext } from "react";                              //importa react               
import { ShopContext } from "../../context/shop-context";               //importa el contexto para el carrito

export const Product = (props) => {
    const { id, nombre, precio, descripcion, img1, img2, img3 } = props.data; //se guardan las informaciones de la base de datos
    const { addToCart, cartItems} = useContext(ShopContext);            //se usa el context para agregar al carrito 

    const cartItemAmount = cartItems[id];                               //se guarda la cantidad de productos en el carrito
    return (
        <div className="product">                                       {/*se muestran las informaciones de los productos en la pagina principal */}
            <div className="slide-var">                                 {/*se hace el carusel */}
                <ul>
                    <li><img src={img1} alt={nombre}/></li>             {/*se muestran las imagenes de los productos en la pagina principal */}
                    <li><img src={img2} alt={nombre}/></li>
                    <li><img src={img3} alt={nombre}/></li>
                </ul>
            </div>                                                      
            <div className="descripcion">                               {/*se muestran las descripciones de los productos en la pagina principal */}
                <p>{descripcion}</p>
            </div>
            <div className="description"> 
                <p> 
                    <b>{nombre}</b>                                     {/*se muestran los nombres de los productos en la pagina principal */}
                </p>
                <p> ${precio}</p>                                       {/*se muestran los precios de los productos en la pagina principal */}
            </div>
            <button className="addToCartBttn" onClick={() => addToCart(id)}> {/*se agrega un producto por su id */}
                Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>} {/*se imprime el numero de la cantidad */}
            </button>
        </div> 
    );
};